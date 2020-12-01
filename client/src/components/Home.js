import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, selectCurrentUser } from '../redux/userSlice';

export default function Home() {
  const [loginStatus, setLoginStatus] = useState();
  const dispatch = useDispatch();
  let currentUser = useSelector(selectCurrentUser);

  const logout = () => {
    Axios.get('api/logout').then(() => {
      // reloading the page also works, since the logged in user is retrieved from the store upon page load
      dispatch(setCurrentUser(null));
      // window.location.reload();
    })
  }

  // upon login status change, conditionally render home page
  useEffect(() => {
    if (currentUser) {
      // console.log(userInfo);
      setLoginStatus(
      <div className='home'>
        <p>
          You are logged in as user "{currentUser.username}".
        </p>
        <button className='btn-primary btn' onClick={logout}>log out</button>
      </div>)
    } else {
      setLoginStatus(
      <div className='home'>
        <p>
          You are not logged in.
        </p>
        <a href='/login'>Go to login page</a>
      </div>)
    }
  }, [currentUser])


  return(
    <>
      {loginStatus}
    </>
  )
}