import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
//import axios from 'axios';


class Password extends Component {

    render(){

        return(
            <React.Fragment>
                <h1 style = {{textAlign: 'center', marginBottom: '0.5em', marginTop: '0.5em'}}>密码管理中心</h1>

                
            </React.Fragment>
        )
    }
}

export default withRouter(Password);

