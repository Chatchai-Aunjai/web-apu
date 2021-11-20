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
        <Layout id="error-layout"style={{textAlign: 'center', background: '#99DFB2', alignItems: 'center'}}>
            <img src={error} style={{width: 200, textAlign: 'center'}} alt="error"/>
            <Typography style={{}}>The page you requested could not be found</Typography>
            <Layout style={{paddingTop: 10, background: '#99DFB2'}}>
            <Link to ={'/admin'}><Button type="primary" shape="round" style={{textAlign: 'center', width: 175}}>Go to mainpage</Button></Link>
            </Layout>
        </Layout>
    )
}
export default Errorpage;