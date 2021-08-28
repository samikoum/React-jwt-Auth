import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import ProtectedLogin from './ProtectedLogin';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'))
  console.log(isAuth)
  return (
    <>
      <Router>
        <Header setIsAuth={setIsAuth} />
        <Switch>
          <ProtectedLogin
            exact
            path="/login"
            component={Login}
            isAuth={isAuth}
            setIsAuth={setIsAuth}
          />
          <Route exact path="/register">
            <SignIn />
          </Route>
          <ProtectedRoute
            exact
            path="/dashboard"
            component={Dashboard}
            isAuth={isAuth}
          />
        </Switch>
      </Router>

    </>
  );
}

export default App;
