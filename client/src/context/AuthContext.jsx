import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext


export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [loading, setLoading] = useState(true)
    // const [tasks, setTasks] = useState([])

    const navigate = useNavigate()

    function loginUser(e){
        e.preventDefault()
        fetch('http://127.0.0.1:8000/api/token/',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": e.target.username.value,
                "password": e.target.password.value
            })
        })
        .then(res => {
            if(res.status === 200){
                res.json().then(jwtToken =>{
                    setAuthTokens(jwtToken)
                    setUser(jwt_decode(jwtToken.access))
                    localStorage.setItem('authTokens', JSON.stringify(jwtToken))
                    navigate('/tasks')
                    return

                })
            } else {
                res.json().then(err => console.log(err))
            }
        })
    }

    // async function fetchUserTasks(){
    //     fetch('http://127.0.0.1:8000/tasks/',{
    //                 method: 'GET',
    //                 headers:{
    //                   'Content-Type': 'application/json',
    //                   'Authorization': 'Bearer ' + authTokens?.access
    //                 }
    //               })
    //               .then(res => {
    //                 if(res.ok){
    //                     res.json().then(tasksArray=>{
    //                         setTasks(tasksArray)
    //                     })
    //                 } else {
    //                     res.json().then(err => console.log(err))
    //                 }
    //               })
    // }

    // async function doBoth(){
    //     loginUser()
    //     .then(()=>fetchUserTasks)
    // }



    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    const updateToken = async ()=>{
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"refresh": authTokens?.refresh})
        })
        let data = await response.json()
        if(response.ok){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
        authTokens: authTokens
    }

    useEffect(()=>{
        if(loading){
            updateToken()
        }

        const fourMinutes = 1000 * 60 * 4 // in milliseconds
        const interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return() => clearInterval(interval)
    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}