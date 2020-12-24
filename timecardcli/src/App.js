import React from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import Page2 from './components/Page2/page2';
import AdminHome from './components/Admin/adminhome';
import AddEmp from './components/Admin/addemp';
import AddHol from './components/Admin/addhol';
import EmpHome from './components/Employee/emphome';
import AppLeave from './components/Employee/appleave';
import CanLeave from './components/Employee/canleave';
import ViewRep from './components/Employee/viewrep';
import ViewHol from './components/Employee/viewhol';
import Home from './components/Home/Home';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

function App(props) {

  return (
    <Router>

    <Switch>
      <Route exact path="/page2" component={Page2} />
      <Route exact path="/adminhome" component={AdminHome} />
      <Route exact path="/addemp" component={AddEmp} />
      <Route exact path="/addhol" component={AddHol} />
      
      <Route exact path="/emphome" component={EmpHome} />
      <Route exact path="/appleave" component={AppLeave} />
      <Route exact path="/canleave" component={CanLeave} />
      <Route exact path="/viewrep" component={ViewRep} />
      <Route exact path="/viewhol" component={ViewHol} />
      <Route exact path="/" exact={true} component={Home} />
    </Switch>
    </Router>
  );
}

export default App;
