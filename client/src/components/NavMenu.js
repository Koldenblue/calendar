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
      <Navbar.Brand href="#home">
        {/* Image by <a href="https://pixabay.com/users/clker-free-vector-images-3736/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=308837">
        Clker-Free-Vector-Images</a> 
        from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=308837">Pixabay</a> */}
        <img
          alt=""
          src={require('../assets/images/calendar-2.png')}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        {' '}
        Calendar
      </Navbar.Brand>
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