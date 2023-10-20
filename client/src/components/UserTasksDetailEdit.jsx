import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const UserTasksDetailEdit = ({tasks, setTasks}) => {


    // Do I need to pass tasks as a prop or does the setter function have access to it
    //
    // revist pattern for watching form in state
    //

    const {authTokens} = useContext(AuthContext)
    const {taskId} = useParams()
    const [task, setTask] = useState({})

    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/tasks/${taskId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens?.access)
            }
        })
        // .then(res=>res)
        .then(res=>{
            if(res.ok){
                res.json().then(task=>{
                    setTask(task)
                })
            } else {
                res.json().then(err=>{
                    alert('ISSUE: check console output')
                    console.log(err)
                })
            }
        })
    },[])

    function patchTask(){
        fetch(`http://127.0.0.1:8000/tasks/${taskId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens?.access)
            }
            // ,
            // body: JSON.stringify()
        })
        .then(res=>{
            if(res.ok){
                res.json().then(patchedTask=>{
                    setTask(patchTask)
                    setTask((tasks)=>{
                        tasks.map((originalTask)=>{
                            if(originalTask.id === patchedTask.id){
                                return patchedTask
                            } else {
                                return originalTask
                            }
                        })
                    })
                })
            } else {
                res.json().then(err=>{
                    console.log(err)
                    alert("ISSUE: Chek console output")
                })
            }
        })
    }

    return (
        <form>
            <label htmlFor='title'>Title:</label>
            <input name='title' value={task.title}></input>
            <label htmlFor='description'></label>
            <input name='description'></input>
            <label htmlFor='start_date'></label>
            <input name='start_date'></input>
            <label htmlFor='end_date'></label>
            <input name='end_date'></input>
            <label htmlFor='completed'></label>
            {task.completed ? <input type='checkbox' checked></input> :
                <input type='checkbox'>completed</input>
            }
            <button type='submit'>Submit</button>
        </form>
  )
}

// title = models.CharField(max_length=200)
// description = models.CharField(max_length=500)
// start_date = models.DateTimeField(default=timezone.now)
// end_date = models.DateTimeField(null=True, blank=True)
// completed = models.BooleanField(default=False)

export default UserTasksDetailEdit