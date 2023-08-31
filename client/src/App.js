import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import LoginPage from './components/LoginPage'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
      <Router>
        <Routes>
          <Route Component={Home} path="/" exact/>
          <Route Component={LoginPage} path="/login"/>
        </Routes>
      </Router>
  );
}

export default App;
