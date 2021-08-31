import React from 'react';
import './App.css';
import 'antd/dist/antd.css';

import AppHeader from './common/header';

import { Layout } from 'antd';
const { Header } = Layout;

function AppBooked() {
  return (
    <Layout className="layout">
        <Header>
            <AppHeader/>
        </Header>
    </Layout>
  );  
}

export default AppBooked;