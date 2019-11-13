import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Button, Row, Form, Col, Tab, Tabs, Alert } from 'react-bootstrap';
import axios from 'axios';


class General extends Component {
    state = {
        userinfo: null,
        first_day: null,
        start_week: '',
        end_week: '',
        duty_group: '',
        duty_week: '',

    }

    componentDidMount(){
        if(this.props.location.state){
            this.setState({
                userinfo: this.props.location.state.userinfo,
            });
        };    
    }

    firstDayChangeHandler = event => {
        this.setState({
            first_day: event.target.value.replace(/-/g,''),
        })
    }

    startWeekChangeHandler = event => {
        this.setState({
            start_week: event.target.value.trim(),
        })
    }

    endWeekChangeHandler = event => {
        this.setState({
            end_week: event.target.value.trim(),
        })
    }

    dutyGroupChangeHandler = event => {
        this.setState({
            duty_group: event.target.value.trim(),
        })
    }

    dutyWeekChangeHandler = event => {
        this.setState({
            duty_week: event.target.value.trim(),
        })
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    initSubmitHandler = (event) => {
        event.preventDefault();
        let upData = new FormData();
        upData.append('first_day', this.state.first_day);
        upData.append('start_week',this.state.start_week);
        upData.append('end_week',this.state.end_week);

        let config = {
            headers: {
                'token': this.state.userinfo.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        axios.post('/api/duty/arrange', upData, config)
        .then((res) => {
            console.log("upData: ", res);
            alert(res.data.msg);

        })
        .catch((err) => {
            alert('操作出错，请稍后再试或联系系统管理员。');
            console.log("AXIOS ERROR: ", err);
            return;
        })
    }

    arrangeSubmitHandler = (event) => {
        event.preventDefault();
        let upData = new FormData();
        upData.append('duty_group', this.state.duty_group);
        upData.append('duty_week',this.state.duty_week);

        let config = {
            headers: {
                'token': this.state.userinfo.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        axios.put('/api/duty/arrange', upData, config)
        .then((res) => {
            console.log("upData: ", res);
            alert(res.data.msg);

        })
        .catch((err) => {
            alert('操作出错，请稍后再试或联系系统管理员。');
            console.log("AXIOS ERROR: ", err);
            return;
        })
    }

    deleteHandler () {
        axios.delete('/api/duty/arrange', {
            headers: {
                'token': this.state.userinfo.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
          } )
        .then((res) => {
            console.log(res);
            alert(res.data.msg);
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            return;
        })
    }


    render(){

        const initialise = (
            <Form onSubmit={this.initSubmitHandler}>
                    <Row>
                        <Form.Group as={Col} controlId="formFirstDay">
                            <Form.Label>起始日期</Form.Label>
                            <Form.Control type = 'date' onChange = { event => this.firstDayChangeHandler(event) } />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formStartWeek">
                            <Form.Label>起始周</Form.Label>
                            <Form.Control type = 'number' value = {this.state.start_week} onChange = { event => this.startWeekChangeHandler(event) } />
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col} controlId="formEndWeek">
                            <Form.Label>结束周</Form.Label>
                            <Form.Control type = 'number' value = {this.state.end_week} onChange = { event => this.endWeekChangeHandler(event) } />
                        </Form.Group>
                    </Row>
                    <div className = 'col text-center'>
                        <Button variant="primary" type="submit"> 提交 </Button>
                    </div>
                </Form>
        )

        const arrange = (
            <Form onSubmit={this.arrangeSubmitHandler}>
                    <Row>
                        <Form.Group as={Col} controlId="formDutyGroup">
                            <Form.Label>值班组别</Form.Label>
                            <Form.Control value = {this.state.duty_group} onChange = { event => this.dutyGroupChangeHandler(event) } />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formDutyWeek">
                            <Form.Label>值班周</Form.Label>
                            <Form.Control type = 'number' value = {this.state.duty_week} onChange = { event => this.dutyWeekChangeHandler(event) } />
                        </Form.Group>
                    </Row>

                    <div className = 'col text-center'>
                        <Button variant="primary" type="submit"> 提交 </Button>
                    </div>
                </Form>
        )

        const deleteExtra = (
            <div className = 'col text-center'>
                <Button onClick = {this.deleteHandler} variant="primary" style = {{ marginTop: '1.5em'}}> 确认删除多余 </Button>
            </div>
        )

        return(
            <React.Fragment>
                <h1 style = {{textAlign: 'center', marginBottom: '0.5em', marginTop: '0.5em'}}>常规功能</h1>
                <Alert className = 'InFormAlert' variant = 'danger' id = 'alertBrowser' 
                style = {{marginBottom: '1.5em'}}
                > 请不要擅自使用该页面功能！ </Alert>
                <Tabs defaultActiveKey="initialise" id="roleChoose" style = {{maxWidth: '700px', margin: 'auto'}}>
                    <Tab eventKey="initialise" title="初始化排版">
                        {initialise}
                    </Tab>
                    <Tab eventKey="arrange" title="分配值班周">
                        {arrange}
                    </Tab>
                    <Tab eventKey="deleteExtra" title="删除多余">
                        {deleteExtra}
                    </Tab>
                </Tabs>
            </React.Fragment>
        )
    }
}

export default withRouter(General);

