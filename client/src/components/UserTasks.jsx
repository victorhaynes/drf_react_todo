import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const UserTasks = ({tasks, setTasks}) => {

  // const [tasks, setTasks] = useState([])
  const {authTokens, logoutUser, user} = useContext(AuthContext)

  useEffect(()=>{
    fetchTasks()
  },[])

  const fetchTasks = async() =>{
    const response = await fetch('http://127.0.0.1:8000/tasks/',{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens?.access)
      }
    })
    const data = await response.json()
    if(response.ok){
      setTasks(data)
    } else {
      logoutUser()
    }
  }



  return (
    <div>
      <h1>{user.username.toUpperCase()}'s Tasks</h1>
      <ul>
          {tasks?.map(task => (
              <Link key={task.id} to={`/tasks/${task.id}`}>
                <li>{task.title}</li>
              </Link>
          ))}
      </ul>
      {/* <h1>My tasks here</h1> */}
    </div>
  )
}

export default UserTasks