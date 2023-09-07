import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage'
import Header from './components/Header'
import NotFound404 from './components/NotFound404';
import UserTasks from './components/UserTasks'
import PrivateRoutes from './utils/PrivateRoutes';
import ProfilePage from './components/ProfilePage';
import UserTasksDetail from './components/UserTasksDetail';
import {AuthProvider} from './context/AuthContext'


import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import { useState } from 'react';


function App() {


 
  return (
    <Router>
      <AuthProvider>
      <Header/>
        <Routes>
          <Route Component={LoginPage} path="/login"/>
          <Route Component={PrivateRoutes}>
            <Route Component={ProfilePage} path="/profile"/>
            <Route Component={UserTasks} path="/tasks" exact/>
            <Route Component={UserTasksDetail} path="/tasks/:taskId"/>
          </Route>
          <Route Component={NotFound404} path="*"/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
