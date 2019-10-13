import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './LoginForm.css';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';


class LoginForm extends Component {

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

        axios.post('https://smp-api.cloud.airscr.com/api/login', postData)
            .then((res) => {
                this.setState({
                    info: res.data,
                })

                if (this.state.info.code !== 200){
                    this.setState({
                        ifClicked: false,
                        pwdVal: false,
                    })
                }
                else if(this.state.info.code === 200){
                    this.setState({
                        pwdVal: true,
                    })
                }

                
                console.log("RESPONSE RECEIVED: ", this.state.info);
                console.log(res);
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
                    msg: 'hey, u\'d better check your info again. Note: This notice will not be included in the final version.'
                }
            })            
        }

        if(this.state.valAlert.type === 'success' && this.state.pwdVal === false){
            this.setState({
                valAlert: {
                    type: 'danger',
                    msg: 'hey, u\'d better check your info again. Note: This notice will not be included in the final version.'
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

    
    

    render() {

        return (
            <div>
                <Alert className = 'InFormAlert' variant = 'warning' id = 'alertConstuction'> The site is still under constuction.<br></br> <strong>Note</strong>: Now user credentials can be validated on this <em>single page</em>. If the credentials are correct, the button text would not be modified which is set on purpose. For the final version, the page will be redirected to the next page.</Alert>
                <Alert className = 'InFormAlert' variant = 'info' id = 'alertBrowser'> Internet Explorer is not supported. For better performance, browsers based on the Chromium core is recommended.</Alert>
                
                <Form>
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
                <Alert variant = {this.state.valAlert.type} className = 'InFormAlert' id='pwdAlertInfo' > {this.state.valAlert.msg}</Alert>
            </div>
        )
    }
}

export default LoginForm;