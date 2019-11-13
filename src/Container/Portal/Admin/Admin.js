import { withRouter, NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin.css';
import membersimg from '../../../assets/img/members.svg';
import studentsimg from '../../../assets/img/students.svg'
import shieldimg from '../../../assets/img/shield.svg'
import toolsimg from '../../../assets/img/tools.svg'
class Admin extends Component {
    state = {
        userinfo: null,        
    };
    
    componentDidMount(){
        if(this.props.location.state){
            this.setState({
                userinfo: this.props.location.state.userinfo,
            });
        };
        console.log(this.state);
    }

    render(){
        console.log(this.state);

        return(
            <React.Fragment>
                <h1>管理员面板</h1>
                <br />

                <section className = 'RoleSelect'>
                    <Card style={{ width: '17rem',}}>
                        <Card.Img variant="top" src={membersimg} width={71} height={95} top='400px' style={{ marginTop: '1em' }} />
                        <Card.Body>
                            <NavLink to={{
                                pathname: '/Portal/Admin/Members',
                                state: { userinfo: this.state.userinfo },
                            }}><Button variant="primary">队员信息</Button></NavLink>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '17rem',  }}>
                        <Card.Img variant="top" src={studentsimg} width={71} height={95} top='400px' style={{ marginTop: '1em' }} />
                        <Card.Body>
                            <NavLink to={{
                                pathname: '/Portal/Admin/Students',
                                state: { userinfo: this.state.userinfo },
                            }}><Button variant="primary">学生信息</Button></NavLink>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '17rem',  }}>
                        <Card.Img variant="top" src={shieldimg} width={71} height={95} top='400px' style={{ marginTop: '1em' }} />
                        <Card.Body>
                            <NavLink to={{
                                pathname: '/Portal/Admin/Password',
                                state: { userinfo: this.state.userinfo },
                            }}><Button variant="primary">密码管理</Button></NavLink>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '17rem',  }}>
                        <Card.Img variant="top" src={toolsimg} width={71} height={95} top='400px' style={{ marginTop: '1em' }} />
                        <Card.Body>
                            <NavLink to={{
                                pathname: '/Portal/Admin/General',
                                state: { userinfo: this.state.userinfo },
                            }}><Button variant="primary">常规功能</Button></NavLink>
                        </Card.Body>
                    </Card>
                </section>
            </React.Fragment>
        )
    }
}

export default withRouter(Admin);
