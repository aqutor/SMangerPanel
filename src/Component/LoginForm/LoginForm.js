import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './LoginForm.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';


class LoginForm extends Component {

    state = {
        username: null,
        password: null,
        msg: '',
        ifClicked: false,
        info: null,
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
                    info: res,
                })
                console.log("RESPONSE RECEIVED: ", this.state.info);
                console.log(res);
              })
              .catch((err) => {
                
                console.log("AXIOS ERROR: ", err);
              })

    }
    // componentDidUpdate = () => {
        
        
    // }

    
    

    render() {
        let SubmitText = '提交';

        console.log(this.state);

        return (
            <div>
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
                            {SubmitText}
                        </Button>
                        <p></p>
                        <Form.Text className="text-muted" >
                            忘记密码?
                        </Form.Text>
                </Form>

                
    
                <Container>
                    <Row className="justify-content-md-center">
                    <Col xs={10}><Alert variant = 'warning' id = 'alertWarn'> The site is still under constuction. </Alert></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default LoginForm;