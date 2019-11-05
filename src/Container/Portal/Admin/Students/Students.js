import { Route, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import StudentInfo from './StudentInfo/StudentInfo';



class Students extends Component {

    render(){

        return(
            
            <React.Fragment>

                <h2 style = {{textAlign: 'center', paddingTop: '1em'}}>学生信息管理</h2>
                
                <Route path={this.props.match.url + '/:id'} exact component={StudentInfo} />
            </React.Fragment>
        )
    }
}

export default withRouter(Students);

