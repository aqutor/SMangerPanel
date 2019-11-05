import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Table,  Modal, Button, Row, Form, Col } from 'react-bootstrap';
import axios from 'axios';
import './Members.css';

class Members extends Component {

    state = {
        userinfo: null,
        members: null,
        show: false,
        isChecked: null,
        activeNote: null,
        showAdd: false,
        addSID: null,

    };
    
    componentDidMount(){
        if(this.props.location.state){
            this.setState({
                userinfo: this.props.location.state.userinfo,
            });

            // loading config
            axios.get('/api/member/manage', {
                params: {
                    pagenum: 0,
                    pagesize: 0,
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

    handleShow = (props) => {
        this.setState({
            show: true,
            active: props
        })
        axios.get('/api/user/note', {
            params: {
                sid: props.sid,
            },
            headers: {
                'token': this.props.location.state.userinfo.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
          } )
        .then((res) => {
            console.log(res);
            this.setState({
                activeNote: res.data.data.notes[0].note,
            })
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            return;
        })
        

    }

    phoneChangeHandler = (event) => {
        this.setState({
            active: {
                ...this.state.active,
                pnumber: event.target.value.trim(),
            }
        })
    }

    noteChangeHandler = (event) => {
        this.setState({
            activeNote: event.target.value,
        })
    }

    positionChangeHandler = (event) => {
        this.setState({
            active: {
                ...this.state.active,
                mposition: event.target.value,
            }
        })
        
    }

    deleteHandler = () => {
        if(this.state.active){
            axios.delete('/api/member/manage', {
                params: {
                    sid: this.state.active.sid
                },
                headers: {
                    'token': this.props.location.state.userinfo.token,
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

    groupChangeHandler = (event) => {
        this.setState({
            active: {
                ...this.state.active,
                dgroup: event.target.value,
            }
        })
        
    }

    classChangeHandler = (event) => {
        this.setState({
            active: {
                ...this.state.active,
                stuclass: event.target.value.trim(),
            }
        })
        
    }

    addSIDHandler = (event) => {
        this.setState({
            addSID: event.target.value,
        })
    }

    handleCloseAdd = () => {
        this.setState({
            showAdd: false,
        })
    }

    handleShowAdd = () => {
        this.setState({
            showAdd: true,
        })
    }

    addSubmitHandler = (event) => {
        event.preventDefault();

        let upData = new FormData();
        upData.append('sid', this.state.addSID);

        let config = {
            headers: {
                'token': this.state.userinfo.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }

        axios.post('/api/member/manage', upData, config)
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

    submitHandler = (event) => {
        event.preventDefault();
        let upData = new FormData();


        if(this.state.active.pnumber){
            if(this.state.active.pnumber[0] !== '1' || this.state.active.pnumber.length !== 11){
                alert('您的手机号码格式不正确。');
                return;
            }
            upData.append('pnumber',this.state.active.pnumber);
        }

        upData.append('sid',this.state.active.sid);

        if(this.state.activeNote){
            upData.append('note',this.state.activeNote);
        }
        if (this.state.active.sid !== '201710311101' && this.state.active.mposition === '队长'){
            alert('不能分配其他用户队长权限');
            return;
        }

        upData.append('mposition',this.state.active.mposition);

        if(this.state.active.dgroup !== ''){
            upData.append('dgroup',this.state.active.dgroup);
        }
        upData.append('stuclass',this.state.active.stuclass);

        let config = {
            headers: {
                'token': this.state.userinfo.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }

        axios.put('/api/member/manage', upData, config)
        .then((res) => {
            console.log("upData: ", res);
            if(res.data.status === 200){
                alert('资料修改成功。');
            }
            else{
                alert(res.data.msg);
            }
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            return;
        })


    }


    render(){
        let memberItems = null;
        if(this.state.members){
            memberItems = this.state.members.map( d => {
                return (
                    <tr key={d.sid} onClick={() => this.handleShow(d)} > 
                        <td>{d.sid}</td>
                        <td>{d.stuclass}</td>
                        <td>{d.sname}</td>
                        <td>{d.pnumber}</td>
                        <td>{d.gender}</td>
                        <td>{d.dgroup}</td>
                        <td>{d.mposition}</td>
                    </tr>
                );
            } ) 
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
                                    <Form.Label>用户名</Form.Label>
                                    <Form.Control disabled value = {this.state.active.sid}  />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formName">
                                    <Form.Label>姓名</Form.Label>
                                    <Form.Control disabled value = {this.state.active.sname} />
                                    </Form.Group>
                                </Form.Row>

                                <Row>
                                <Form.Group as={Col} controlId="formPhone">
                                    <Form.Label>手机号码（仅限中国大陆）</Form.Label>
                                    <Form.Control value = {this.state.active.pnumber} onChange={(event) => this.phoneChangeHandler(event)} />
                                </Form.Group>

                                
                                </Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formPosition">
                                        <Form.Label>职务</Form.Label>
                                        <Form.Control as='select' value = {this.state.active.mposition} onChange={(event) => this.positionChangeHandler(event)} >
                                            <option>队长</option>
                                            <option>违规监督员</option>
                                            <option>普通队员</option>
                                            <option>组长</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGroup">
                                        <Form.Label>分组</Form.Label>
                                        <Form.Control as='select' value = {this.state.active.dgroup} onChange={(event) => this.groupChangeHandler(event)} >
                                            <option></option>
                                            <option>A1</option>
                                            <option>A2</option>
                                            <option>A3</option>
                                            <option>A4</option>
                                            <option>A5</option>
                                            <option>B1</option>
                                            <option>B2</option>
                                            <option>B3</option>
                                            <option>B4</option>
                                            <option>B5</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} sm controlId="formClass">
                                    <Form.Label>班级</Form.Label>
                                    <Form.Control value = {this.state.active.stuclass} onChange={(event) => this.classChangeHandler(event)} />
                                    </Form.Group> 
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formNote">
                                        <Form.Label>备注</Form.Label>
                                        <Form.Control as="textarea" value={this.state.activeNote} onChange={this.noteChangeHandler} />
                                    </Form.Group>
                                </Form.Row>

                                
                                <div className = 'col text-center'>
                                    <Button style = {buttonMargin} variant="primary" type="submit">
                                     提交 
                                    </Button>

                                    <Button variant="danger" style = {buttonMargin} onClick = {this.deleteHandler}>
                                     删除用户 
                                    </Button>

                                    <Button variant="secondary" style = {buttonMargin} onClick = {this.handleClose}>
                                     关闭 
                                    </Button>
                                </div>
                            </Form>
            )
        }
        
        console.log(this.state);

        return(
            <React.Fragment>
                <h1>队员信息管理</h1>
                <br />
                <Button style={{marginLeft: '2em',}} variant="outline-info" onClick = {this.handleShowAdd} >添加队员</Button>
                <Table responsive striped>
                    <thead>
                        <tr>
                        <th>学号</th>
                        <th>班级</th>
                        <th>姓名</th>
                        <th>电话</th>
                        <th>性别</th>
                        <th>分组</th>
                        <th>职位</th>
                        </tr>
                    </thead>
                    <tbody>
                        {memberItems}
                    </tbody>
                </Table>

                <Modal size = 'lg' show = {this.state.show} onHide = {this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>分组信息</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            {formModal}
                        </Modal.Body>
                    <Modal.Footer>
                        
                    </Modal.Footer>
                </Modal>

                <Modal size = 'lg' show = {this.state.showAdd} onHide = {this.handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>添加队员</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.addSubmitHandler}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formSID">
                                    <Form.Label >用户名</Form.Label>
                                    <Form.Control value = {this.state.addSID} onChange = {(event) => this.addSIDHandler(event)} />
                                    </Form.Group>
                                </Form.Row>

                                <div className = 'col text-center'>
                                    <Button style = {buttonMargin} variant="primary" type="submit">
                                     提交 
                                    </Button>

                                    <Button variant="secondary" style = {buttonMargin} onClick = {this.handleCloseAdd}>
                                     关闭 
                                    </Button>
                                </div>
                        </Form>
                        </Modal.Body>
                    <Modal.Footer>
                        
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}

export default withRouter(Members);

