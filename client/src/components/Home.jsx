import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'

const Home = () => {

  const [tasks, setTasks] = useState([])
  const {authTokens, logoutUser} = useContext(AuthContext)

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
      <h1>HOME PAGE</h1>
      <ul>
          {tasks.map(task => (
              <li key={task.id} >{task.title}</li>
          ))}
      </ul>
    </div>
  )
}

export default Home