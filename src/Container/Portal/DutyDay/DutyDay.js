import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
//import axios from 'axios';
import './DutyDay.css';

class DutyDay extends Component {

    render(){

        return(
            <React.Fragment>
                <h2>您的值班日期</h2>
            </React.Fragment>
        )
    }
}

export default withRouter(DutyDay);

