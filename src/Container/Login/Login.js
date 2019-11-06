import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Login.css';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom'

class Login extends Component {

    state = {
        username: null,
        password: null,
        pwdVal: null,
        ifClicked: false,
        valAlert: {
            type: null,
            msg: null,
        },
        SubmitText: '提交',
        
    }
    
    usernameChangeHandler = (event) => {
        this.setState({
            username: event.target.value,
        })
    }

    passwordChangeHandler = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    


    postCredHandler = () => {
        this.setState({
            ifClicked: true,
        });

        const postData = {
            sid: this.state.username,
            pwd: this.state.password,
        }

        axios.post('/api/login', postData)
            .then((res) => {
                this.setState({
                    info: res.data,
                })

                if (this.state.info.status !== 200){
                    this.setState({
                        ifClicked: false,
                        pwdVal: false,
                    })
                }
                else if(this.state.info.status === 200){
                    
                    this.setState({
                        pwdVal: true,
                    });
                    // const userInfo = this.state.info.data;
                    // this.props.infoCallback(userInfo);
                    // this.props.history.push("/Portal");
                }
              })
              .catch((err) => {
                
                console.log("AXIOS ERROR: ", err);
              })

    }


    
    componentDidUpdate(){
        if(this.state.ifClicked && this.state.SubmitText === '提交'){
            this.setState({
                SubmitText: '请稍等...',
            })
        }

        if(!this.state.ifClicked && this.state.SubmitText === '请稍等...'){
            this.setState({
                SubmitText: '提交',
            })
        }

        if(this.state.valAlert.type === null && this.state.valAlert.type !== 'success' && this.state.valAlert.type !== 'danger' && this.state.pwdVal === true){
            
            this.setState({
                valAlert: {
                    type: 'success',
                    msg: 'hey, u r good to go. Note: This notice will not be included in the final version.'
                }
            })            
        }

        if(this.state.valAlert.type === null && this.state.valAlert.type !== 'success' && this.state.valAlert.type !== 'danger' && this.state.pwdVal === false){
            this.setState({
                valAlert: {
                    type: 'danger',
                    msg: '用户名或密码输入错误，请重试。'
                }
            })            
        }

        if(this.state.valAlert.type === 'success' && this.state.pwdVal === false){
            this.setState({
                valAlert: {
                    type: 'danger',
                    msg: '用户名或密码输入错误，请重试。'
                }
            }) 
        }

        if(this.state.valAlert.type === 'danger' && this.state.pwdVal === true){
            
            this.setState({
                valAlert: {
                    type: 'success',
                    msg: 'hey, u r good to go. Note: This notice will not be included in the final version.'
                }
            })
            
        }
    }

    componentDidMount(){
        console.log(this.props)
    }

    
    

    render() {
        let redirect = null;
        if(this.state.valAlert.type === 'success'){
            redirect = <Redirect to={{
                pathname: '/Portal',
                state: { userinfo: this.state.info.data }
            }} />;
        }
        

        return (
            
            <div >
                {redirect}
                <Alert className = 'InFormAlert' variant = 'warning' id = 'alertConstuction'>
                    <strong>注意</strong>: 您可通过页脚的提交问题（点击 "Get started"）反馈遇到的问题。不一定按照模版填写。<br />
                    <strong>密码找回/管理功能尚未完成。</strong>
                    </Alert>
                <Alert className = 'InFormAlert' variant = 'info' id = 'alertBrowser'> Internet Explorer 不受支持，请使用基于 Chromium 内核的浏览器。</Alert>
                <Alert variant = {this.state.valAlert.type} className = 'InFormAlert' id='pwdAlertInfo' > {this.state.valAlert.msg}</Alert>
                <Form className='LoginForm'>
                    <Form.Group controlId="formBasicEmail">
                        <h1>登录 - 晨跑管理系统</h1>
                        <h1> </h1>
                        <Form.Control type="text" placeholder="学号" onChange = {(event) => this.usernameChangeHandler(event)} />
                    </Form.Group>    
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="密码" onChange = {(event) => this.passwordChangeHandler(event)} />
                    </Form.Group>
                        <Button block variant="primary" onClick = {this.postCredHandler}>
                            {this.state.SubmitText}
                        </Button>
                        <p></p>
                        <Form.Text className="text-muted" >
                            忘记密码?
                        </Form.Text>
                </Form>
                
            </div>
        )
    }
}

export default withRouter(Login);