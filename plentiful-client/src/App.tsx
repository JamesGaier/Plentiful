import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DonatePage from './pages/DonatePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Router>
          <Route exact path="/" render={() => <HomePage type="Log In"/>}/>
          <Route path="/signup" render={() => <HomePage type="Sign Up" />}/>
          <Route path="/about" component={AboutPage}/>
          <Route path="/donate" component={DonatePage}/>
      </Router>
    </div>
  );
}

export default App;
