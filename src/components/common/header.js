import React from 'react';
import { Menu } from 'antd'

function AppHeader() {
    return (
        <div class="container-fluid">
            <div className="header">
                <div className="logo">
                    <Menu className="menu" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">หน้าแรก</Menu.Item>
                        <Menu.Item key="2">จองคิว</Menu.Item>
                        <Menu.Item key="3">ตรวจสอบคิว</Menu.Item>
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default AppHeader;