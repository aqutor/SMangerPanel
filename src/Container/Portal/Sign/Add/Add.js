import axios from 'axios';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';



class Add extends Component {

    state = {
        userinfo: null,
        sid: null,
        reason: null,
        date: null,
        name: null,
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
    componentDidUpdate(){
        console.log(this.state);
    }

    dateChangeHandler = (event) => {
        this.setState({
            date: event.target.value.replace(/-/g,''),
        })
    }

    nameChangeHandler = (event) => {
        this.setState({
            name: event.target.value.trim(),
        })
    }

    sidChangeHandler = (event) => {
        this.setState({
            sid: event.target.value.trim(),
        })
    }

    reasonChangeHandler = (event) => {
        this.setState({
            reason: event.target.value.trim(),
        })
    }

    submitHandler = (event) => {
        event.preventDefault();

        let upData = new FormData();

        if(/^(\d{12})$/.test(this.state.sid)){
            upData.append('sid',this.state.sid);
        }
        else {
            alert('学号格式不符');
            return;
        }
        if(this.state.name === ''){
            alert('姓名未填写');
        }
        else {
            upData.append('sname',this.state.name);
        }
        

        upData.append('date',this.state.date);

        upData.append('reason',this.state.reason);

        let config = {
            headers: {
                'token': this.state.userinfo.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }

        axios.post('/api/sign_info', upData, config)
        .then((res) => {
            console.log("upData: ", res);
            if(res.data.status === 200){
                alert('信息添加成功。')
            }
            else {
                alert(res.data.msg);
            }
            
        })
        .catch((err) => {
            alert('操作出错，请稍后再试或联系系统管理员。');
            console.log("AXIOS ERROR: ", err);
            return;
        })
    }

    render(){
        return(
            <React.Fragment>
                <h1 style = {{textAlign: "center", marginBottom: '1em'}}>新增记录</h1>
                <Form onSubmit={this.submitHandler}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formSID">
                        <Form.Label>学号</Form.Label>
                        <Form.Control onChange = {(event) => this.sidChangeHandler(event)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formName">
                        <Form.Label>姓名</Form.Label>
                        <Form.Control onChange = {(event) => this.nameChangeHandler(event)} />
                        </Form.Group>    
                    </Form.Row>

                    <Row>
                        <Form.Group as={Col} controlId="formDate">
                            <Form.Label>日期</Form.Label>
                            <Form.Control type = 'date' onChange = {(event) => this.dateChangeHandler(event)} />
                        </Form.Group>
                    </Row>

                    <Form.Row>
                        <Form.Group as={Col} sm controlId="formReason">
                        <Form.Label>原因</Form.Label>
                        <Form.Control as="textarea" rows="3" onChange = {(event) => this.reasonChangeHandler(event)} />
                        </Form.Group> 
                    </Form.Row>

                    <div className = 'col text-center'>
                        <Button  variant="primary" type="submit">
                         提交 
                        </Button>
                    </div>
                </Form>
               
            </React.Fragment>
        )
    }
}

export default withRouter(Add);
