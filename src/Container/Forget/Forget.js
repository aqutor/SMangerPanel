import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Form,  Col, Button } from 'react-bootstrap';
//import axios from 'axios';


class Forget extends Component {

    state = {
        sid: null,
        email: null,
        newpwd: null,
        purl: null,
        cnewpwd: null,
    }

    sidChangeHandler = (event) => {
        this.setState({
            sid: event.target.value,
        })
    }

    emailChangeHandler = (event) => {
        this.setState({
            email: event.target.value,
        })
    }

    newpwdChangeHandler = (event) => {
        this.setState({
            newpwd: event.target.value,
        })
    }

    cnewpwdChangeHandler = (event) => {
        this.setState({
            cnewpwd: event.target.value,
        })
    }

    submitHandler = (event) => {
        event.preventDefault();

        if(this.state.newpwd !== this.state.cnewpwd){
            alert('两次输入的密码不匹配');
        }
    }

    render(){

        return(
            <React.Fragment>
                <h1 style = {{marginTop: "1em", marginBottom: '0.5em', textAlign: 'center'}}>找回密码</h1>
                <p style = {{ textAlign: 'center', color: 'gray', fontSize: '20px'}}>我们需要对您的一些资料进行核实</p>
                <Form onSubmit={this.submitHandler}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formSID">
                        <Form.Label>学号</Form.Label>
                        <Form.Control onChange = {(event) => this.sidChangeHandler(event)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formName">
                        <Form.Label>邮箱</Form.Label>
                        <Form.Control type = 'email' onChange = {(event) => this.emailChangeHandler(event)} />
                        </Form.Group>

                        
                    </Form.Row>
                    
                    <Form.Row>
                        <Form.Group as={Col} controlId="formPwd">
                            <Form.Label>新密码</Form.Label>
                            <Form.Control type="password" placeholder="新密码" onChange = {(event) => this.newpwdChangeHandler(event)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formConPwd">
                            <Form.Label>确认密码</Form.Label>
                            <Form.Control type="password" placeholder="确认密码" onChange = {(event) => this.cnewpwdChangeHandler(event)} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formConPwd">
                            <Form.Label>手持学生卡照片<div style = {{color: 'grey', fontSize: '12px'}}> 您的资料被将会严格保密且仅用作认证使用，您可在能够辨认的情况下加上水印上传。如果不放心此认证方式，请当面联系队长。</div></Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                    </Form.Row>

                    <div className = 'col text-center'>
                        <Button  variant="primary" type="submit" style = {{marginTop: '0.5em', marginBottom: '0.5em'}}>
                         提交 
                        </Button>
                    </div>
                </Form>
            </React.Fragment>
        )
    }
}

export default withRouter(Forget);

