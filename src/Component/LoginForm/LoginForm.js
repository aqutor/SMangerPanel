import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const loginForm = () => {
    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <h1>登录 - 晨跑管理系统</h1>
                <h1> </h1>

                <Form.Control type="text" placeholder="学号" />

            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" placeholder="密码" />
            </Form.Group>

            <Button variant="primary" block type="submit">
                提交
            </Button>
        </Form>
    )
}

export default loginForm;