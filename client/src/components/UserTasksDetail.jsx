import React from 'react'
import { useParams } from 'react-router-dom'

const UserTasksDetail = () => {

    const {taskId} = useParams();

    return (
        <div>This is task #{taskId}</div>
    )
}

export default UserTasksDetail