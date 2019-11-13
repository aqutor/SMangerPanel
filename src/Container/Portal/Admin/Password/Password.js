import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import { Table, Form, Col, Button, Row, Modal, InputGroup, Image } from 'react-bootstrap';


class Password extends Component {

    state = {
        userinfo: null,
        records: null,
        show: false,
        active: null,
    }

    componentDidMount(){
        console.log(this.props);
        if(this.props.location.state){
            this.setState({
                userinfo: this.props.location.state.userinfo,
            }
            )
        };

        axios.get('/api/forget_pwd', {
            params: {
                pagenum: 0,
                pagesize: 0,
            },
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
    }

    handleClose = () => {
        this.setState({
            show: false,
        })
        window.location.reload();
    }

    handleShow = (props) => {
        this.setState({
            show: true,
            active: props
        })
    }

    passHandler = () => {
        let upData = new FormData();
        upData.append('eventid', this.state.active.eventid)
        upData.append('is_agree', 1);
        axios.put('/api/forget_pwd', upData, {
            headers: {
                'token': this.state.userinfo.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then((res) => {
            console.log(res);
            alert(res.data.msg);
            if(res.data.status === 200){
                this.setState({
                    active:{
                        ...this.state.active,
                        status: 1,
                    }
                })
            }
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            return;
        })
    }

    rejectHandler = () => {
        let upData = new FormData();
        upData.append('eventid', this.state.active.eventid)
        upData.append('is_agree', 0);
        axios.put('/api/forget_pwd', upData, {
            headers: {
                'token': this.state.userinfo.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then((res) => {
            console.log(res);
            alert(res.data.msg);
            if(res.data.status === 200){
                this.setState({
                    active:{
                        ...this.state.active,
                        status: 2,
                    }
                })
            }
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            return;
        })
    }

    deleteHandler = () => {
        if(this.state.active){
            axios.delete('/api/forget_pwd', {
                params: {
                    eventid: this.state.active.eventid,
                },
                headers: {
                    'token': this.state.userinfo.token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
              } )
            .then((res) => {
                console.log(res);
                alert(res.data.msg);
                this.setState({
                    show: false,
                })
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
                return;
            })
        }
    }

    render(){
        let recordItems = null;

        const buttonMargin = {
            marginLeft: '0.25em',
            marginRight: '0.25em',
        };
        
        if (this.state.records) {
            recordItems = ( this.state.records.map( d => {
                let status = null;
                switch(d.status){
                    case 0:
                        status = '未审核';
                        break;
                    case 1:
                        status = '通过'
                        break;
                    case 2:
                        status = '拒绝'
                        break;
                    default:
                        status = '未知状态';
                }
                return (
                    <tr key={d.eventid} onClick={() => this.handleShow(d)} > 
                        <td>{d.sid} </td>
                        <td>{d.sname}</td>
                        <td>{d.email}</td>
                        <td>{status}</td>
                    </tr>
                )
            })
            )
        }

        let formModal = null;

        if(this.state.active){
            let status = null;
            switch (this.state.active.status){
                case 0:
                    status = '未审核';
                    break;
                case 1:
                    status = '通过'
                    break;
                case 2:
                    status = '拒绝'
                    break;
                default:
                    status = '未知状态';
            }

        let buttonControl = null;

        const modalPadding = {
            paddingLeft: '1.2em',
            paddingRight: '1.2em',
        }
        
        if(this.state.active.status === 0){
            console.log(this.state);
            buttonControl = (
                <React.Fragment>
                    <InputGroup.Append>
                        <Button variant="outline-success" style = {modalPadding} onClick = {this.passHandler} >通过</Button>
                    </InputGroup.Append>
                    <InputGroup.Append>
                        <Button variant="outline-warning" style = {modalPadding} onClick = {this.rejectHandler} >拒绝</Button>
                    </InputGroup.Append>
                </React.Fragment>
            )
        }

            formModal = (
            <Form onSubmit={this.submitHandler}>
                    <Row>
                        <Image src={this.state.active.purl} style = {{margin: '0 auto 2em', width: '90%'}} fluid />
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formSID">
                            <Form.Label>学号</Form.Label>
                            <Form.Control value = {this.state.active.sid} disabled />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formName">
                            <Form.Label>姓名</Form.Label>
                            <Form.Control value = {this.state.active.sname} disabled />
                        </Form.Group>
                    </Row>

                    <Row>
                    <Form.Group as={Col} controlId="formClass">
                        <Form.Label>审核编号</Form.Label>
                        <Form.Control value = {this.state.active.eventid} disabled />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formdDsname">
                        <Form.Label>邮箱</Form.Label>
                        <Form.Control type = 'email' value = {this.state.active.email} disabled />
                    </Form.Group>

                    </Row>

                    <Row>
                        <Form.Group as={Col} controlId="formDate">
                            <Form.Label>审核状态</Form.Label>                   
                            <InputGroup>
                            <Form.Control value = {status} disabled />
                            {buttonControl}
                            </InputGroup>
                        </Form.Group>
                        
                    </Row>
                    <div className = 'col text-center'>
                        <Button variant="danger" style = {buttonMargin} onClick = {this.deleteHandler}>
                         删除记录 
                        </Button>
                        <Button variant="secondary" style = {buttonMargin} onClick = {this.handleClose}>
                         关闭 
                        </Button>
                    </div>
                </Form>
        )}

        

        return(
            <React.Fragment>
                <h1 style = {{textAlign: 'center', marginBottom: '0.5em', marginTop: '0.5em'}}>密码管理中心</h1>

                <Table responsive striped>
                    <thead>
                        <tr>
                        <th>学号</th>
                        <th>姓名</th>
                        <th>邮箱</th>
                        <th>审核状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recordItems}
                    </tbody>
                </Table>
                <Modal size = 'lg' show = {this.state.show} onHide = {this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>详细手签记录</Modal.Title>
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

export default withRouter(Password);

