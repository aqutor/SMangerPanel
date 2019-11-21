import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Table, Form, Col, Button, Row, Modal, Image, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';


class Records extends Component {

    state = {
        userinfo: null,
        records: null,
        totol: null,
        sid: null,
        show: false,
        active: null,
        status: null,
        page: null,
        newPage: null,
    };

    componentDidMount(){
        console.log(this.props);
        if(this.props.location.state){
            this.setState({
                userinfo: this.props.location.state.userinfo,
            }
            )
        };

        axios.get('/api/vio_info', {
            params: {
                pagenum: 1,
                pagesize: 25,
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
                page: Math.ceil(res.data.data.total / 25),
            })
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            return;
        })
    }

    pageChangeHandler = (event) => {
        this.setState({
            newPage: Math.floor(event.target.value),
        })
    }

    pageClickHandler = () => {
        
        if(this.state.newPage > this.state.page || this.state.newPage < 1){
            alert('页码格式错误');
            return;
        }
        axios.get('/api/vio_info', {
            params: {
                pagenum: this.state.newPage,
                pagesize: 25,
                data_type: 'fil',
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
                total: res.data.data.total,
                page: Math.ceil(res.data.data.total / 25),
            })
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            return;
        })
    }

    componentDidUpdate(){
        console.log(this.state);
    }

    handleClose = () => {
        this.setState({
            show: false,
        })
    }

    handleShow = (props) => {
        this.setState({
            show: true,
            active: props
        })
    }

    sidChangeHandler = event => {
        this.setState({
            sid: event.target.value,
        })
    }

    deleteHandler = () => {
        if(this.state.active){
            axios.delete('/api/vio_info', {
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

    submitHandler = (event) => {
        event.preventDefault();
        let upData = new FormData();
        upData.append('sid', this.state.sid);
        upData.append('eventid',this.state.active.eventid);

        let config = {
            headers: {
                'token': this.state.userinfo.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        axios.put('/api/vio_info', upData, config)
        .then((res) => {
            console.log("upData: ", res);
            
            if(res.data.status === 200){
                this.setState({
                    active: {
                        ...this.state.active,
                        status: 1,
                        poid: this.state.userinfo.user.sid,
                        sid: this.state.sid,
                    }
                });
            }
            alert(res.data.msg);

        })
        .catch((err) => {
            alert('操作出错，请稍后再试或联系系统管理员。');
            console.log("AXIOS ERROR: ", err);
            return;
        })
    }

    render(){
        const buttonMargin = {
            marginLeft: '0.25em',
            marginRight: '0.25em',
        };

        let recordItems = null;

        if (this.state.records) {
            recordItems = ( this.state.records.map( d => {
                let status = null;
                switch(d.status){
                    case 0:
                        status = <td style = {{ color: 'green'}}>未指认</td>;
                        break;
                    case 1:
                        status = <td>已指认</td>;
                        break;
                    default:
                        status = <td>未知状态</td>;
                }

                return (
                    <tr key={d.eventid} onClick={() => this.handleShow(d)} > 
                        <td>{d.eventid} </td>
                        <td>{d.vdate}</td>
                        <td>{d.taid}</td>
                        {status}
                    </tr>
                )
            })

            )
        }

        

        let formModal = null;
        let buttonControl = true;

        if(this.state.active){
            let identiftyControl = true;
            if (this.state.active.status === 0){
                identiftyControl = false;
            }

            if(this.state.active.status === 0){
                buttonControl = (
                    <Button style = {buttonMargin} variant="primary" type="submit">
                         提交 
                    </Button>
                )
            }

            formModal = (
                <Form onSubmit={this.submitHandler}>
                    <Row>
                        <Image src={this.state.active.purl} style = {{margin: '0 auto 2em', width: '90%'}} fluid />
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formEventId">
                            <Form.Label>事件编号</Form.Label>
                            <Form.Control value = {this.state.active.eventid} disabled />
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col} controlId="formDate">
                            <Form.Label>违规日期</Form.Label>
                            <Form.Control value = {this.state.active.vdate} disabled />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formSID">
                            <Form.Label>违规学生学号</Form.Label>
                            <Form.Control value = {this.state.active.sid} disabled = {identiftyControl} onChange = {event => this.sidChangeHandler(event)} />
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col} controlId="formPoid">
                            <Form.Label>指认学生学号</Form.Label>
                            <Form.Control value = {this.state.active.poid} disabled />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formdTaid">
                            <Form.Label>拍照者学生学号</Form.Label>
                            <Form.Control value = {this.state.active.taid} disabled />
                        </Form.Group>
                    </Row>

                    <div className = 'col text-center'>
                        {buttonControl}
                        <Button variant="danger" style = {buttonMargin} onClick = {this.deleteHandler}>
                         删除记录 
                        </Button>
                        <Button variant="secondary" style = {buttonMargin} onClick = {this.handleClose}>
                         关闭 
                        </Button>
                    </div>
                </Form>
            )
        }

        return(
            <React.Fragment>
                <h1 style = {{textAlign: 'center', marginBottom: '0.5em', marginTop: '0.5em'}}>违规记录</h1>

                <Table responsive striped>
                    <thead>
                        <tr>
                        <th>编号</th>
                        <th>日期</th>
                        <th>记录人学号</th>
                        <th>审核状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recordItems}
                    </tbody>
                </Table>

                <InputGroup className="mb-3" style = {{width: "12em"}}>
                    
                    <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    type = 'number'
                    onChange={(event) => this.pageChangeHandler(event)}
                    />
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-default">/{this.state.page} 页</InputGroup.Text>
                    </InputGroup.Prepend>
                    <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={() => this.pageClickHandler()} >跳转</Button>
                    </InputGroup.Append>
                </InputGroup>

                <Modal size = 'lg' show = {this.state.show} onHide = {this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>指认系统</Modal.Title>
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

export default withRouter(Records);

