import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import LoginPage from './components/LoginPage'
import Header from './components/Header'
import NotFound404 from './components/NotFound404';
import PrivateRoutes from './utils/PrivateRoutes';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Header/>
        <Routes>
          <Route Component={Home} path="/" exact/>
          <Route Component={LoginPage} path="/login"/>
          <Route Component={PrivateRoutes}>
            <Route Component={NotFound404} path="/abc"/>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
