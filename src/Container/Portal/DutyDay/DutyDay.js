import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
//import axios from 'axios';


class DutyDay extends Component {

    render(){

        return(
            <React.Fragment>
                <h1 style = {{textAlign: 'center', marginBottom: '0.5em', marginTop: '0.5em'}}>您的值班日期</h1>
            </React.Fragment>
        )
    }
}

export default withRouter(DutyDay);

