import './App.css';
import NavBar from './layouts/NavBar';
import { useState, useEffect } from 'react';
import Login from './authentication/Login';
import SignUp from './authentication/SignUp';
import SignIn from './screens/AdminSignIn'
import Customers from './screens/Customer';
import Appointment from './screens/Appointment';
import Errorpage from './screens/Errorpage';
import { Layout } from 'antd';
import { firebase } from "./Firebase/firebase";
import {
  BrowserRouter as Router,
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
      <section className="hero">
        <Layout class="mainLayout"> 
          <Routers/>
        </Layout>
      </section>
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
