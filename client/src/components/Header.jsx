import React from 'react'
import {Link} from "react-router-dom";
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';


const Header = () => {
  let {user} = useContext(AuthContext)
  return (
    <div>  
        <Link to="/">Home</Link>
        <span> | </span>
        <Link to="/login">Login</Link>
        <span> | </span>
        <Link to="/profile">Private Route</Link>
        {user ? <p>Hello {user.username}</p> : null}
    </div>
  )
}

export default Header