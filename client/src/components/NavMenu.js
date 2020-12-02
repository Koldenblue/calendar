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
      // reloading the page also works, since the logged in user is retrieved from the store upon page load
      dispatch(setCurrentUser(null));
      // window.location.reload();
    })
  }

  return (<>
    <Navbar bg="light">
      <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
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