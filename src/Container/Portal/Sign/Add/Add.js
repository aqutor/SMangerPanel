import { withRouter, NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';


class Add extends Component {

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
                <h1 style = {{textAlign: "center", marginBottom: '1em'}}>新增记录</h1>

               
            </React.Fragment>
        )
    }
}

export default withRouter(Add);
