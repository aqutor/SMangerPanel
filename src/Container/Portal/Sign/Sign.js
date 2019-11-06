import { withRouter, NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import addimg from '../../../assets/img/add.svg'
import tapimg from '../../../assets/img/tap.svg'

class Sign extends Component {

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
        return(
            <React.Fragment>
                <h1 style = {{textAlign: "center", marginBottom: '1em'}}>手签管理中心</h1>

                <section className = 'RoleSelect'>
                    <Card style={{ width: '18rem',}}>
                        <Card.Img variant="top" src={addimg} width={71} height={95} top='400px' style={{ marginTop: '1em' }} />
                        <Card.Body>
                            <NavLink to={{
                                pathname: '/Portal/Sign/Records',
                                state: { userinfo: this.state.userinfo },
                            }}><Button variant="primary">查看记录</Button></NavLink>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem',  }}>
                        <Card.Img variant="top" src={tapimg} width={71} height={95} top='400px' style={{ marginTop: '1em' }} />
                        <Card.Body>
                            <NavLink to={{
                                pathname: '/Portal/Sign/Add',
                                state: { userinfo: this.state.userinfo },
                            }}><Button variant="primary">新增记录</Button></NavLink>
                        </Card.Body>
                    </Card>
                </section>
            </React.Fragment>
        )
    }
}

export default withRouter(Sign);
