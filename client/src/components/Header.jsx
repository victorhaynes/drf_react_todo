import React from 'react'
import {Link} from "react-router-dom";
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';


const Header = () => {
  let {user, logoutUser} = useContext(AuthContext)
  return (
    <div>  
        <Link to="/tasks">Tasks</Link>
        <span> | </span>
        {user ? <Link to="/login" onClick={logoutUser}>Logout</Link> : <Link to="/login">Login</Link>}
        <span> | </span>
        <Link to="/profile">Profile Page</Link>
        {user ? <p>Signed in as {user.username}</p> : null}
    </div>
  )
}

export default Header