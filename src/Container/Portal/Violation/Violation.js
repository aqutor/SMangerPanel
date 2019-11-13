import { withRouter, NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import paperimg from '../../../assets/img/paper.svg';
import passwordimg from '../../../assets/img/password.svg'

//import axios from 'axios';


class Violation extends Component {

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


        return(
            <React.Fragment>
                <h1 style = {{textAlign: 'center', marginBottom: '0.5em', marginTop: '0.5em'}}>违规管理中心</h1>
                <section className = 'RoleSelect'>
                    <Card style={{ width: '17rem',}}>
                        <Card.Img variant="top" src={passwordimg} width={71} height={95} top='400px' style={{ marginTop: '1em' }} />
                        <Card.Body>
                            <NavLink to={{
                                pathname: '/Portal/Violation/Records',
                                state: { userinfo: this.state.userinfo },
                            }}><Button variant="primary">查看记录</Button></NavLink>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '17rem',  }}>
                        <Card.Img variant="top" src={paperimg} width={71} height={95} top='400px' style={{ marginTop: '1em' }} />
                        <Card.Body>
                            <NavLink to={{
                                pathname: '/Portal/Violation/Add',
                                state: { userinfo: this.state.userinfo },
                            }}><Button variant="primary">添加记录</Button></NavLink>
                        </Card.Body>
                    </Card>
                </section>
            </React.Fragment>
        )
    }
}

export default withRouter(Violation);

