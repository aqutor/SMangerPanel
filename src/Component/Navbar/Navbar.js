import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const navbar = () => {
    return(
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">晨跑管理系统</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Item><Nav.Link>登录</Nav.Link></Nav.Item>
                
            </Nav>
        </Navbar>
    )
}

export default navbar;