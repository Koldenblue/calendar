import React, { useState, useEffect } from 'react';
import { setCurrentUser, selectCurrentUser } from './redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import Login from './components/LoginSignupPages/Login';
import Signup from './components/LoginSignupPages/Signup';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';
import Home from './components/Home';

function App() {
  const dispatch = useDispatch();
  let currentUser = useSelector(selectCurrentUser);

  // upon route switch, gets user info if already logged in (otherwise redux store state is reset to initial value on page reload)
  useEffect(() => {
    axios.get("/api/userdata").then(({ data }) => {
      if (data) {
        console.log(data)
        dispatch(setCurrentUser(data))
      }
    })
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>

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
