import { Route, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import StudentInfo from './StudentInfo/StudentInfo';



class Students extends Component {

    render(){

        return(
            
            <React.Fragment>

                <h2 style = {{textAlign: 'center', paddingTop: '1em'}}>学生信息管理</h2>
                <Button style={{marginLeft: '2em',}} variant="outline-info">添加学生</Button>
                <Route path={this.props.match.url + '/:id'} exact component={StudentInfo} />
            </React.Fragment>
        )
    }
}

export default withRouter(Students);

