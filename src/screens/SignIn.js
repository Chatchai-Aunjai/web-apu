import React from "react";
import { firebase } from "../Firebase/firebase";
import { Typography } from 'antd';
import kkulogo from '../images/kkulogo.png';
import {
  Link
} from "react-router-dom";
const { Title } = Typography;

const SignIn = (props) => {
  const SignInWithFirebase = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            const token = result.credential.accessToken;
            const user = result.user;
            const data = {
                storetoken: token,
                username: user.displayName,
                email: user.email,
                imageurl: user.photoURL,
                userId: user.uid
            }
            var users = firebase.firestore().collection("users").doc(user.email);
                users.set({
                    email: user.email,
            })
            localStorage.setItem('user', JSON.stringify(data));
            props.signin(data);
        }).catch((error) => {
            const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = error.credential;
          console.log(errorMessage);
        });
  };
  return (
    <div className="login">
      <div className="loginContainer">
        <div className="loginLogoContainer">
          <img className="loginlogo" src={kkulogo} alt="kkulogo"/>
        </div>
        <div className="loginTitleContainer">
          <Title>สำนักหอสมุด <br></br> มหาวิทยาลัยขอนแก่น</Title>
        </div>
        <div 
            style={{
              width: "95%",
              borderRadius: "20px",
            }}
        >
          <Link to="/admin">
        <button
          type="primary"
          style={{
            color: 'white', 
            background: "#0ca9dd",
            border: "none",
            width: "95%",
            borderRadius: "20px",
            height: '50px',
            cursor: "pointer"
          }}
          onClick={SignInWithFirebase}
        >
          Login using kkumail
        </button>
        </Link>
        </div>

        
      </div>
    </div>
  );
};

export default SignIn;
