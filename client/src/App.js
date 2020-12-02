import React, { useState, useEffect } from 'react';
import { setCurrentUser, selectCurrentUser } from './redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import Login from './components/LoginSignupPages/Login';
import Signup from './components/LoginSignupPages/Signup';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  let currentUser = useSelector(selectCurrentUser);

  // upon route switch, gets user info if already logged in (otherwise redux store state is reset to initial value on page reload)
  useEffect(() => {
    // get user login info. loading is true until login info is retrieved
    axios.get("/api/userdata").then(({ data }) => {
      if (data) {
        dispatch(setCurrentUser(data))
      }
      setLoading(false)
    }).catch(err => {
      console.error(err);
    })
  }, [])


  return (
    <div className="App">
      <Router>
        <Switch>
        <ProtectedRoute exact path="/" user={currentUser} isLoading={loading} onFailureRedirectToPath="/login">
          <Home />
        </ProtectedRoute>

          <Route exact path='/login'>
            <Login />
          </Route>

          <Route exact path='/signup'>
            <Signup />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
