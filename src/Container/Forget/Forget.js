import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Form,  Col, Button, Alert } from 'react-bootstrap';
import axios from 'axios';


class Forget extends Component {

    state = {
        sid: null,
        email: null,
        newpwd: null,
        purl: 'https://o2.airscr.com/content/images/2019/11/sense-brian-cop_2.jpg',
        cnewpwd: null,
        showAlert: false,
        eventid: null,
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
            return;
        }

        if(!this.state.sid){
            alert('学号未填写');
            return;
        }

        if(this.state.sid){
            if(!/^(\d{12})$/.test(this.state.sid)){
                alert('学号输入错误');
                return;
            }
        }

        if(!this.state.email){
            alert('邮箱未填写')
            return;
        }

        // workaroud.

        if(!this.state.purl){
            alert('请上传图片');
            return;
        }

        let upData = new FormData();
        upData.append('newpwd', this.state.newpwd)
        upData.append('sid', this.state.sid)
        upData.append('email', this.state.email)
        upData.append('purl', this.state.purl)
        axios.post('/api/forget_pwd', upData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then((res) => {
            console.log(res);
            if(res.data.status === 200){
                this.setState({
                    showAlert: true,
                    eventid: res.data.data.eventid,
                })
            }
            else{
                alert(res.data.msg);
            }
            
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            return;
        })
    }

    render(){

        let alertInfo = null;
        if (this.state.showAlert && this.state.eventid){
            alertInfo = (
                <Alert variant = 'info' style = {{maxWidth: '700px', margin: 'auto'}}>
                    您的密码找回请求已成功提交，事件编号为 <strong>{this.state.eventid}</strong> ，该编号为您找回密码请求的唯一凭证。我们将通过您所填写的电子邮箱通知您的密码审核状态。
                </Alert>
            )
        }

        return(
            <React.Fragment>
                <h1 style = {{marginTop: "1em", marginBottom: '0.5em', textAlign: 'center'}}>找回密码</h1>
                <p style = {{ textAlign: 'center', color: 'gray', fontSize: '20px'}}>我们需要对您的一些资料进行核实</p>
                {alertInfo}
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
                        <Form.Group as={Col} controlId="formPic">
                            <Form.Label>手持学生卡照片<div style = {{color: 'grey', fontSize: '12px'}}> 您的资料被将会严格保密且仅用作认证使用，您可在能够辨认的情况下加上水印上传。如果不放心此认证方式，请当面联系队长。</div></Form.Label>
                            <Form.Control type="file" accept="image/*" />
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

