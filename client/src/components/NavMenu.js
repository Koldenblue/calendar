import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, selectCurrentUser } from '../redux/userSlice';
import Axios from 'axios';

export default function NavMenu() {
  const dispatch = useDispatch();
  let currentUser = useSelector(selectCurrentUser);

  const logout = () => {
    Axios.get('api/logout').then(() => {
      dispatch(setCurrentUser(null));
      // the ProtectedRoute component redirects to /login when user is set to null
    })
  }

  return (<>
    <Navbar>
      <Navbar.Brand href="#home">Calendar</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: {currentUser.username}
        </Navbar.Text>
        <Button className='btn btn-outline-success' variant="outline-success" onClick={logout}>Log Out</Button>
      </Navbar.Collapse>
    </Navbar>
  </>)
}