import React from 'react'

const LoginPage = () => {
  return (
    <div>
        <h1>Login Page</h1>
        <form>
            <input type="text" name="username" placeholder="Enter Username"/>
            <input type="password" name="password" placeholder="Enter Password"/>
            <input type="submit"/>
        </form>
    </div>
  )
}

export default LoginPage