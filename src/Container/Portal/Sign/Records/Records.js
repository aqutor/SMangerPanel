import axios from 'axios';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Table, Form, Col, Button, Row, Modal, InputGroup, FormControl } from 'react-bootstrap';



class Records extends Component {

    state = {
        userinfo: null,
        records: null,
        show: false,
        firstdate: null,
        lastdate: null,
        sid: null,
        dsid: null,
        active: null,
        page: null,
    };

    componentDidMount(){
        console.log(this.props);
        if(this.props.location.state){
            this.setState({
                userinfo: this.props.location.state.userinfo,
            }
            )
        };

        axios.get('/api/sign_info', {
            params: {
                pagenum: 1,
                pagesize: 25,
                data_type: 'json',
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
                page: Math.ceil(res.data.data.total/25),
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
        axios.get('/api/sign_info', {
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
                members: res.data.data.members,
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

    deleteHandler = () => {
        if(this.state.active){
            axios.delete('/api/sign_info', {
                params: {
                    sid: this.state.active.sid,
                    dsid: this.state.active.dsid,
                    date: this.state.active.ddate.replace(/-/g, ''),
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

    startDateChangeHandler = (event) => {
        this.setState({
            firstdate: event.target.value.replace(/-/g,''),
        })
    }

    endDateChangeHandler = (event) => {
        this.setState({
            lastdate: event.target.value.replace(/-/g,''),
        })
    }

    sidChangeHandler = (event) => {
        this.setState({
            sid: event.target.value.trim(),
        })
    }

    dsidChangeHandler = (event) => {
        this.setState({
            dsid: event.target.value.trim(),
        })
    }

    buttonClickHandler = () => {

        if (!this.state.firstdate && this.state.lastdate) {
            alert('请填写开始日期。');
            return;
        }
        if (this.state.firstdate && !this.state.lastdate) {
            alert('请填写结束日期。');
            return;
        }

        let paramsC = {
            pagenum: 0,
            pagesize: 0,
            data_type: 'json',
        };

        if (this.state.firstdate && this.state.lastdate) {
            paramsC.firstdate = this.state.firstdate;
            paramsC.lastdate = this.state.lastdate;
        }
        
        if (this.state.sid){
            paramsC.sid = this.state.sid;
        }

        if (this.state.dsid){
            paramsC.sid = this.state.dsid;
        }

        axios.get('/api/sign_info', {
            params: paramsC,
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

    

    render(){
        let recordItems = null;
        if (this.state.records) {
            recordItems = ( this.state.records.map( d => {
                let key = d.sid.concat(d.ddate);
                return (
                    <tr key={key} onClick={() => this.handleShow(d)} > 
                        <td>{d.sid} </td>
                        <td>{d.sname}</td>
                        <td>{d.stuclass}</td>
                        <td>{d.ddate}</td>
                    </tr>
                )
            })

            )
        }

        let buttonMargin = {
            marginLeft: '0.25em',
            marginRight: '0.25em',
        };

        let formModal = null;

        if(this.state.active){
            formModal = (
                <Form onSubmit={this.submitHandler}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formSID">
                            <Form.Label>学号</Form.Label>
                            <Form.Control value = {this.state.active.sid} disabled />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formName">
                            <Form.Label>姓名</Form.Label>
                            <Form.Control value = {this.state.active.sname} disabled />
                        </Form.Group>
                    </Form.Row>

                    <Row>
                    <Form.Group as={Col} controlId="formClass">
                        <Form.Label>班级</Form.Label>
                        <Form.Control value = {this.state.active.stuclass} disabled />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formDate">
                        <Form.Label>日期</Form.Label>
                        <Form.Control value = {this.state.active.ddate} disabled />
                    </Form.Group>

                    </Row>

                    <Row>
                    <Form.Group as={Col} controlId="formdDsname">
                        <Form.Label>记录者姓名</Form.Label>
                        <Form.Control value = {this.state.active.dsname} disabled />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formDsid">
                        <Form.Label>记录者学号</Form.Label>
                        <Form.Control value = {this.state.active.dsid} disabled />
                    </Form.Group>

                    </Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formReason">
                            <Form.Label>原因</Form.Label>
                            <Form.Control as="textarea" value={this.state.active.reason} disabled />
                        </Form.Group>
                    </Form.Row>

                    
                    <div className = 'col text-center'>

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
                <h1 style = {{textAlign: "center", marginBottom: '1em'}}>手签记录</h1>
                <Row>
                <InputGroup className="mb-3" style = {{width: "95%", margin: "auto", }}>
                    <InputGroup.Prepend>
                        <InputGroup.Text>查询条件</InputGroup.Text>
                        <InputGroup.Text>开始和结束日期</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder = '开始日期' type = 'date' onChange = {(event) => this.startDateChangeHandler(event)} />
                    <FormControl placeholder = '结束日期' type = 'date' onChange = {(event) => this.endDateChangeHandler(event)} />
                    <FormControl placeholder = '手签学生学号' onChange = {(event) => this.sidChangeHandler(event)} />
                    <FormControl placeholder = '值班组长学号' onChange = {(event) => this.dsidChangeHandler(event)} />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" onClick = {this.buttonClickHandler} >查询</Button>
                    </InputGroup.Append>
                    </InputGroup>
                </Row>

                <Table responsive striped>
                    <thead>
                        <tr>
                        <th>学号</th>
                        <th>姓名</th>
                        <th>班级</th>
                        <th>日期</th>
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

export default withRouter(Records);
