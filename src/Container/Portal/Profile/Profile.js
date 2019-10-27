import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Form,  Col, Row, Button } from 'react-bootstrap';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Profile extends Component {
    state = {
        userinfo: null,
        isChecked: null,
        pwd: null,
        cpwd: null,
    }

    componentDidMount(){
        console.log(this.props);
        if(this.props.location.state){
            let gender = true;
            if(this.props.location.state.userinfo.gender === '女'){
                gender = false;
            }
            this.setState({
                userinfo: this.props.location.state.userinfo,
                isChecked: gender,
            }
            )
        };
    }

    phoneChangeHandler = (event) => {
        this.setState({
            userinfo: {
                ...this.state.userinfo,
                user: {
                    ...this.state.userinfo.user,
                    pnumber: event.target.value,
                }
            }
        })
        console.log(this.state);
    }

    pwdChangeHandler = (event) => {
        this.setState({
            pwd: event.target.value,
        })
    }

    conpwdChangeHandler = (event) => {
        this.setState({
            cpwd: event.target.value,
        })
    }

    toggleChangeHandler = () => {
        if((this.state.userinfo.user.gender === "女" && this.state.isChecked === false) || this.state.isChecked === null){
            this.setState({
                isChecked: true,
                userinfo: {
                    ...this.state.userinfo,
                    user: {
                        ...this.state.userinfo.user,
                        gender: '男',
                    }
                }
            })
        }
        else if(this.state.userinfo.user.gender === "男" && this.state.isChecked === true){
            this.setState({
                isChecked: false,
                userinfo: {
                    ...this.state.userinfo,
                    user: {...this.state.userinfo.user,
                        gender: '女',
                    }
                }
            })
        }
        console.log(this.state);
      }

    submitHandler= (event) =>{
        const password = this.state.pwd;
        const confwd = this.state.cpwd;
        console.log('您两次输入的密码不匹配哦');
        if( password !== confwd){
            alert('您两次输入的密码不匹配哦！');
            this.props.history.push('/Portal/Profile');
        }
    }
    
    render(){
        console.log(this.state);
        let redirect = null;
        if(!this.props.location.state){
            redirect = <Redirect to={{
                pathname: '/',
            }} />;
        }

        let sid = 'null';

        if(this.state.userinfo){
            sid=this.state.userinfo.user.sid;
        }

        let phone = null;
        if(this.state.userinfo){
            phone = this.state.userinfo.user.pnumber;
        }

        let sclass = 'null';
        if(this.state.userinfo){
            sclass = this.state.userinfo.user.stuclass;
        }

        let pos = 'null';
        if(this.state.userinfo){
            pos = this.state.userinfo.user.mposition;
        }

        let grp = '未分组';
        if(this.state.userinfo){
            grp = this.state.userinfo.user.dgroup;
            if(this.state.userinfo.user.dgroup === null){
                grp = '未分组';
            }
        }

        let name = 'null';
        if(this.state.userinfo){
            name = this.state.userinfo.user.sname;
        }

        
        
        console.log(this.props)
        return(
            <React.Fragment>
                {redirect}
                <h1>个人信息</h1>
                <Form onSubmit={this.submitHandler}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formSID">
                        <Form.Label>用户名</Form.Label>
                        <Form.Control placeholder={sid} disabled />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formName">
                        <Form.Label>姓名</Form.Label>
                        <Form.Control placeholder={name} disabled />
                        </Form.Group>

                        
                    </Form.Row>

                    <Row>
                    <Form.Group as={Col} controlId="formPhone">
                        <Form.Label>电话</Form.Label>
                        <Form.Control placeholder={phone} onChange={(event) => this.phoneChangeHandler(event)} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} sm id="formGender">
                        <Form.Label>性别</Form.Label>
                        <fieldset>
                        <Row>
                            <Form.Check
                            type="radio"
                            label="男"
                            name="radioMale"
                            id="radioMale"
                            checked={this.state.isChecked}
                            onChange={this.toggleChangeHandler}
                            />
                            <Form.Check
                            type="radio"
                            label="女"
                            name="radioFemale"
                            id="radioFemale"
                            checked={!this.state.isChecked}
                            onChange={this.toggleChangeHandler}
                            />
                        </Row>
                        </fieldset>

                    </Form.Group>
                    </Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formPosition">
                            <Form.Label>职务</Form.Label>
                            <Form.Control placeholder={pos} disabled />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGroup">
                            <Form.Label>分组</Form.Label>
                            <Form.Control placeholder={grp} disabled />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} sm controlId="formClass">
                        <Form.Label>班级</Form.Label>
                        <Form.Control placeholder={sclass} disabled />
                        </Form.Group> 
                    </Form.Row>

                    
                    <Form.Row>
                    
                    </Form.Row>
                    
                    <Form.Row>
                        <Form.Group as={Col} controlId="formPwd">
                            <Form.Label>新密码</Form.Label>
                            <Form.Control type="password" placeholder="新密码" onChange = {(event)=>this.pwdChangeHandler(event)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formConPwd">
                            <Form.Label>确认密码</Form.Label>
                            <Form.Control type="password" placeholder="确认密码" onChange = {(event)=>this.conpwdChangeHandler(event)} />
                        </Form.Group>
                    </Form.Row>
                    <div className = 'col text-center'>
                        <Button  variant="primary" type="submit">
                         提交 
                        </Button>
                    </div>
                </Form>


                
            </React.Fragment>
        )
    }
}

export default withRouter(Profile);