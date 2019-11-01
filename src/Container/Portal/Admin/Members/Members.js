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
                pnumber: event.target.value,
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
                stuclass: event.target.value,
            }
        })
        
    }



    submitHandler = () => {

    }

    componentDidUpdate(){
        if(this.state.active){
            if(this.state.active.gender === '女' && (this.state.isChecked === true || this.state.isChecked === null)){
                this.setState({
                    isChecked: false,
                })
            }
            else if(this.state.active.gender === '男' && (this.state.isChecked === false || this.state.isChecked === null)){
                this.setState({
                    isChecked: true,
                })  
            }
        }

        if(this.state.active){
            
        }
    }

    render(){
        let memberIters = null;
        if(this.state.members){
            memberIters = this.state.members.map( d => {
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
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} sm id="formGender">
                                    <Form.Label>性别</Form.Label>
                                    <fieldset>
                                    <Row>
                                        <Form.Check
                                        type="radio"
                                        label="男"
                                        name="radioMale"
                                        id="radioMale"
                                        checked={this.state.isChecked}
                                        onChange={this.toggleChangeHandler}
                                        />
                                        <Form.Check
                                        type="radio"
                                        label="女"
                                        name="radioFemale"
                                        id="radioFemale"
                                        checked={!this.state.isChecked}
                                        onChange={this.toggleChangeHandler}
                                        />
                                    </Row>
                                    </fieldset>

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
                                    <Button className='memberButton' variant="primary" type="submit">
                                     提交 
                                    </Button>

                                    <Button variant="secondary" onClick = {this.handleClose}>
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
                        {memberIters}
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
            </React.Fragment>
        )
    }
}

export default withRouter(Members);

