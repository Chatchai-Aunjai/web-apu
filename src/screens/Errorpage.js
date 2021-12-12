import React from "react";
import { Layout } from 'antd';
import { Typography } from 'antd';
import { Button } from 'antd';
import error from '../images/error.png';
import {
    Link,
   
  } from "react-router-dom";
import '../App.css'

const Errorpage = () => {
    return(
        <Layout id="error-layout"style={{width: 500, height: 300, textAlign: 'center', background: '#f6f6f6', alignItems: 'center', boxShadow: '2px 17px 22px -6px rgba(0,0,0,0.75)', borderRadius:'10px'}}>
            <img src={error} style={{width: 200, textAlign: 'center'}} alt="error"/>
            <Typography style={{}}>The page you requested could not be found</Typography>
            <Layout style={{paddingTop: 10, background: '#f6f6f6'}}>
            <Link to ={'/admin'}><Button  style={{textAlign: 'center', width: 200, height: 20 ,background: "#a73b23", color:'#FFFAFA'}}>Go to mainpage</Button></Link>
            </Layout>
        </Layout>
    )
}
export default Errorpage;