import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Form,  Col, Row, Button, Modal } from 'react-bootstrap';
import SingleDutyDay from '../../../Component/Forms/SingleDutyDay/SingleDutyDay';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class Profile extends Component {
    state = {
        userinfo: null,
        isChecked: null,
        pwd: null,
        cpwd: null,
        phone: null,
        curpwd: null,
        show: false,
        SDM: null,
        duties: null,
    }

    componentDidMount(){
        console.log(this.props);
        if(this.props.location.state){
            let gender = true;
            if(this.props.location.state.userinfo.user.gender === '女'){
                gender = false;

                
            }
            this.setState({
                userinfo: this.props.location.state.userinfo,
                isChecked: gender,
            })

            let config = {
                headers: {
                    'token': this.props.location.state.userinfo.token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
            // loading config
            axios.get('/api/duty/search', config )
            .then((res) => {
                this.setState({
                    SDM: res.data.data.same_date_member,
                    duties: res.data.data.dutys,
                })
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
                return;
            })

            // axios.get('/api/duty/search', config )
            // .then((res) => {
            //     this.setState({
            //         duties: res.data.data.dutys,
            //     })
            // })
            // .catch((err) => {
            //     console.log("AXIOS ERROR: ", err);
            //     return;
            // })
        };
    }

    

    phoneChangeHandler = (event) => {
        this.setState({
            phone: event.target.value.trim(),
        });
    }

    pwdChangeHandler = (event) => {
        this.setState({
            pwd: event.target.value.trim(),
        })
    }

    curpwdChangeHandler = (event) => {
        this.setState({
            curpwd: event.target.value.trim(),
        })
    }

    conpwdChangeHandler = (event) => {
        this.setState({
            cpwd: event.target.value.trim(),
        })
    }

    toggleChangeHandler = (event) => {
        if(event.target.value === '男'){
            this.setState({
                isChecked: true,
            })
        }
        else{
            this.setState({
                isChecked: false,
            })
        }
        // if(this.state.userinfo.user.gender === "女" && (this.state.isChecked === false)){
        //     this.setState({
        //         isChecked: true,
        //         userinfo: {
        //             ...this.state.userinfo,
        //             user: {
        //                 ...this.state.userinfo.user,
        //                 gender: '男',
        //             }
        //         }
        //     })
        // }
        // else if(this.state.userinfo.user.gender === "男" && (this.state.isChecked === true)){
        //     this.setState({
        //         isChecked: false,
        //         userinfo: {
        //             ...this.state.userinfo,
        //             user: {...this.state.userinfo.user,
        //                 gender: '女',
        //             }
        //         }
        //     })
        // }


        console.log(this.state);
      }

    submitHandler= (event) =>{
        event.preventDefault();
        let phoneData = new FormData();
        let pwdData = new FormData();

        if(this.state.pwd || this.state.cpwd){
            if(!this.state.curpwd){
                alert('请输入当前密码');
                return;
            }
            const password = this.state.pwd;
            const confwd = this.state.cpwd;
            if( password !== confwd){
                alert('您两次输入的密码不匹配。');
                return;
            }

            pwdData.append('pwd', this.state.curpwd);
            pwdData.append('npwd', this.state.pwd);
            pwdData.append('sid', this.state.userinfo.user.sid);

        }

        if(this.state.phone){
            if(this.state.phone[0] !== '1' || this.state.phone.length !== 11){
                alert('您的手机号码格式不正确。');
                return;
            }
            
            phoneData.append('pnumber',this.state.phone);
            phoneData.append('gender',this.state.isChecked);
            
        }


        let config = {
            headers: {
                'token': this.state.userinfo.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }


        if(this.state.phone){
            axios.put('/api/user', phoneData, config)
            .then((res) => {
                console.log("phoneData: ", res);
                if(res.data.status === 200){
                    alert('资料修改成功。');
                }
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
                return;
            })
        }

        if(this.state.pwd){
            axios.put('/api/login', pwdData, config)
            .then((res) => {
                console.log("pwdData: ", res);
                if(res.data.status === 200){
                    alert('密码修改成功。')
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

        if(!this.state.pwd && !this.state.phone){
            let data = new FormData();
            data.append('gender', this.state.isChecked);

            axios.put('/api/user', data, config)
            .then((res) => {
                console.log("data: ", res);
                if(res.data.status === 200){
                    alert('性别修改成功。')
                }
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
                return;
            })
        }
    }

    handleClose = () => {
        this.setState({
            show: false,
        })
            

    }

    handleShow = () => {
        this.setState({
            show: true,
        })
    }
    
    render(){
        
        console.log(this.state);
        let redirect = null;
        if(!this.props.location.state){
            redirect = <Redirect to={{
                pathname: '/',
            }} />;
        }

        let sid = null;
        let phone = null;
        let sclass = null;
        let pos = null;
        let grp = '未分组';
        let name = null;

        if(this.state.userinfo){
            sid=this.state.userinfo.user.sid;
            phone = this.state.userinfo.user.pnumber;
            sclass = this.state.userinfo.user.stuclass;
            pos = this.state.userinfo.user.mposition;
            grp = this.state.userinfo.user.dgroup;
            name = this.state.userinfo.user.sname;
            if(this.state.userinfo.user.dgroup === null){
                grp = '未分组';
            }
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
                        <Form.Label>手机号码（仅限中国大陆）</Form.Label>
                        <Form.Control placeholder={phone} onChange={(event) => this.phoneChangeHandler(event)} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} sm id="formGender" onChange={this.toggleChangeHandler}>
                        <Form.Label>性别</Form.Label>
                        <fieldset>
                        <Row>
                            <Form.Check
                            type="radio"
                            label="男"
                            value="男"
                            name="gender"
                            id="radioMale"
                            checked={this.state.isChecked}
                            />
                            <Form.Check
                            type="radio"
                            label="女"
                            value="女"
                            name="gender"
                            id="radioFemale"
                            checked={!this.state.isChecked}
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
                            <Form.Label>分组<em onClick={this.handleShow}>[查看详情]</em></Form.Label>
                            <Form.Control placeholder={grp} disabled onClick={this.handleShow} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} sm controlId="formClass">
                        <Form.Label>班级</Form.Label>
                        <Form.Control placeholder={sclass} disabled />
                        </Form.Group> 
                    </Form.Row>

                    
                    <Form.Row>
                    <Form.Group as={Col} controlId="formCurPwd">
                            <Form.Label>当前密码</Form.Label>
                            <Form.Control type="password" placeholder="当前密码" onChange = {(event)=>this.curpwdChangeHandler(event)} />
                        </Form.Group>
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

                <Modal size = 'lg' show = {this.state.show} onHide = {this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>分组信息</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <SingleDutyDay SDM = {this.state.SDM} duties = {this.state.duties} />
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick = {this.handleClose}>
                            关闭
                        </Button>
                    </Modal.Footer>
                </Modal>


                
            </React.Fragment>
        )
    }
}

export default withRouter(Profile);