import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Portal.css';
import profileimg from '../../assets/img/profile.svg';
import adminimg from '../../assets/img/hierarchical_structure.svg';
import signimg from '../../assets/img/sign.svg';
import { withRouter, NavLink } from 'react-router-dom';

class Portal extends Component{
    state = {
        userinfo: null,        
    };
    
    componentDidMount(){
        console.log(this.props);
        if(this.props.location.state){
            this.setState({
                userinfo: this.props.location.state.userinfo,
            }
            )
        };
    }


        

    render(){
        let name = 'loading';
        if(this.state.userinfo){
            name = this.state.userinfo.user.sname;
        }
        return(

            <React.Fragment>
                <br />
                <h1>你好，{name}。</h1>
                <br />

                <section className = 'RoleSelect'>
                    <Card style={{ width: '17rem',}}>
                        <Card.Img variant="top" src={profileimg} width={71} height={95} top='400px' style={{ marginTop: '1em' }} />
                        <Card.Body>
                            <NavLink to={{
                                pathname: '/Portal/Profile',
                                state: { userinfo: this.state.userinfo },
                            }}><Button variant="primary">个人信息</Button></NavLink>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '17rem',  }}>
                        <Card.Img variant="top" src={adminimg} width={71} height={95} top='400px' style={{ marginTop: '1em' }} />
                        <Card.Body>
                            <NavLink to={{
                                pathname: '/Portal/Admin',
                                state: { userinfo: this.state.userinfo },
                            }}><Button variant="primary">管理员面板</Button></NavLink>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '17rem', }}>
                        <Card.Img variant="top" src={signimg} width={71} height={95} top='400px' style={{ marginTop: '1em' }} />
                        <Card.Body>
                            <NavLink to={{
                                pathname: '/Portal/Sign',
                                state: { userinfo: this.state.userinfo },
                            }}><Button variant="primary">手签管理</Button></NavLink>
                        </Card.Body>
                    </Card>
                </section>
                
            </React.Fragment>
            
        )
    }
}

export default withRouter(Portal);