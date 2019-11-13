import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import { Table,  Modal, Button, Row, Form, Col } from 'react-bootstrap';

class Teacher extends Component {
    state = {
        userinfo: null,
        show: false,
        records: null,
        totol: null,
        tname: '',
        pnumber: '',
        dweek: '',
    }

    componentDidMount(){
        if(this.props.location.state){
            this.setState({
                userinfo: this.props.location.state.userinfo,
            });

            // loading config
            axios.get('/api/teacher/manage', {
                headers: {
                    'token': this.props.location.state.userinfo.token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
              } )
            .then((res) => {
                console.log(res);
                this.setState({
                    records: res.data.data.list,
                    totol: res.data.data.totol,
                })
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
                return;
            })

        };    
    }

    handleClose = () => {
        this.setState({
            show: false,
        })
    }

    handleShow = () => {
        this.setState({
            show: true,
        })
    }

    pnumberChangeHandler = event => {
        this.setState({
            pnumber: event.target.value.trim(),
        })
    }

    dweekChangeHandler = event => {
        this.setState({
            dweek: event.target.value.trim(),
        })
    }

    tnameChangeHandler = event => {
        this.setState({
            tname: event.target.value.trim(),
        })
    }

    submitHandler = event => {
        event.preventDefault();

        let upData = new FormData();
        upData.append('tname',this.state.tname);
        upData.append('pnumber',this.state.pnumber);
        upData.append('dweek',this.state.dweek);

        let config = {
            headers: {
                'token': this.state.userinfo.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }

        axios.put('/api/teacher/manage', upData, config)
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

    render(){
        let teacherItems = null;
        if(this.state.records){
            teacherItems = this.state.records.map( d => {
                if(!d.tname){
                    return null;
                }
                else {
                    return (
                        <tr key={d.dweek} > 
                            <td>{d.dweek}</td>
                            <td>{d.tname}</td>
                            <td>{d.pnumber}</td>
                        </tr>
                    );
                }
            } )
        }

        const buttonMargin = {
            marginLeft: '0.25em',
            marginRight: '0.25em',
        };

        let formModal = (
            <Form onSubmit={this.submitHandler}>
                    <Row>
                        <Form.Group as={Col} controlId="formWeek">
                            <Form.Label>值班周</Form.Label>
                            <Form.Control value = {this.state.dweek} onChange = { event => this.dweekChangeHandler(event) } />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formName">
                            <Form.Label>姓名</Form.Label>
                            <Form.Control value = {this.state.tname} onChange = { event => this.tnameChangeHandler(event) } />
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col} controlId="formPhone">
                            <Form.Label>电话号码</Form.Label>
                            <Form.Control value = {this.state.pnumber} onChange = { event => this.pnumberChangeHandler(event) } />
                        </Form.Group>
                    </Row>
                    <div className = 'col text-center'>
                        <Button style = {buttonMargin} variant="primary" type="submit"> 提交 </Button>
                        <Button variant="secondary" style = {buttonMargin} onClick = {this.handleClose}>
                         关闭 
                        </Button>
                    </div>
                </Form>
        )
        

        return(
            <React.Fragment>
                <h1 style = {{textAlign: 'center', marginBottom: '0.5em', marginTop: '0.5em'}}>教师值班管理</h1>
                <Button style={{marginLeft: '2em', marginBottom: '1em'}} variant="outline-info" onClick = {this.handleShow} >添加/修改教师值班信息</Button>
                
                <Table responsive striped>
                    <thead>
                        <tr>
                        <th>周次</th>
                        <th>姓名</th>
                        <th>电话号码</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teacherItems}
                    </tbody>
                </Table>

                <Modal size = 'lg' show = {this.state.show} onHide = {this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>添加/修改教师值班信息</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {formModal}
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}

export default withRouter(Teacher);

