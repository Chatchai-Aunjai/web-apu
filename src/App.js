import './App.css';
import NavBar from './layouts/NavBar';
import React, { useState, useEffect } from 'react';
import Login from './authentication/Login';
import SignUp from './authentication/SignUp';
import SignIn from './screens/SignIn'
import Customers from './screens/Customer';
import History from './screens/History';
import HistoryDate from './screens/HistoryDate';
import CustomersAfter from './screens/CustomerAfter';
import AppointDone from './screens/AppointDone';
import AppointDoneAfter from './screens/AppointDoneAfter';
import EditData from './screens/EditDefault';
import Errorpage from './screens/Errorpage';
import ReactNotification from 'react-notifications-component'
import { Layout } from 'antd';
import { firebase } from "./Firebase/firebase";
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

const Routers = () => (
  <div>
    <Router>
      <Switch>
        <Route exact path="/admin">
          <NavBar/>
          <Customers/>  
        </Route>
        <Route exact path="/admin/afternoon">
          <NavBar/>
          <CustomersAfter/>
        </Route>
        <Route exact path="/appointment">
          <NavBar/>
          <AppointDone/>  
        </Route>
        <Route exact path="/appointment/afternoon">
          <NavBar/>
          <AppointDoneAfter/>
        </Route>
        <Route exact path="/edit_default">
          <NavBar/>
          <EditData/>  
        </Route>
        <Route exact path="/history">
          <NavBar/>
          <History/>  
        </Route>
        <Route exact path="/history/date">
          <NavBar/>
          <HistoryDate/>  
        </Route>
        <Route>
          <Errorpage/>
        </Route>
      </Switch>
    </Router>
  </div>
);

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(true);
  firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      return setIsUserSignedIn(true);
    }

    setIsUserSignedIn(false)
  })
  if (isUserSignedIn === true){
    return (
      <Router>
      <section className="hero">
        <Layout class="mainLayout">
          <ReactNotification/>
          <Routers/>
        </Layout>
      </section>
      </Router>
    );
  } else {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn}/>
        </Switch>
      </Router>
    );
  }
 
}

export default App;
