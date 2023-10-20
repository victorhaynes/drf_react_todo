import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

const UserTasksDetail = ({tasks, setTasks}) => {

    const {taskId} = useParams();
    const {authTokens} = useContext(AuthContext)
    const [task, setTask] = useState({})
    // const [editing, setEditing] = useState(false)

    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/tasks/${taskId}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens?.access)
            }
        })
        .then(res=>{
            if(res.ok){
                res.json().then(task=>{
                    setTask(task)
                    setTasks()
                }) 
            } else {
                alert('ISSUE: check console output')
                res.json().then(err=>console.log(err))
            }
        })
    },[])


    // function editMode(){
    //     setEditing(!editing)
    // }
    
    return (
        <>
            {/* {editing ? <UserTasksDetailEdit task={task}/> :  */}
            <div>
                <h1>This is task #{taskId} detail page</h1>
                <h2>Title: {task.title}</h2>
                <h3>Description: {task.description}</h3>
                <h3>Overdue: {task.overdue ? "red" : "green"}</h3>
                <h3>Time left: {task.days_remaining}</h3>
                <Link to={`/tasks/${taskId}/edit`} >
                    {/* <button onClick={editMode}>Edit</button> */}
                    <button>Edit</button>
                </Link>
            </div>
            {/* } */}
        </>
    )
}

export default UserTasksDetail