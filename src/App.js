import React from "react";
import "./App.css";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import AppHeader from "./components/common/header";

import { Layout, Breadcrumb } from 'antd';
import AppBookedContent from "./components/common/bookedContent";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout class="mainLayout">
      <Header>
        <AppHeader/>
      </Header>

      <Content class="content">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>หน้าแรก</Breadcrumb.Item>
          <Breadcrumb.Item>จองคิว</Breadcrumb.Item>
        </Breadcrumb>
        <AppBookedContent/>
      </Content>
      
    </Layout>
  );  
}

export default App;
