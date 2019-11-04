import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import { Table,  Modal, Button, Row, Form, Col, Pagination } from 'react-bootstrap';


class StudentInfo extends Component {
    
    state = {
        active: null,
        pag: 1,
        pagesize: null,
        students: null,
        show: false,
        isChecked: null,
    }

    componentDidMount () {
        if(this.props.match.params.id) {
            this.setState({
                pag: this.props.match.params.id
            })
        }

        console.log(this.props);
        this.loadData();
    }



    loadData () {
        axios.get('/api/student/manage', {
            params: {
                pagenum: this.state.pag,
                pagesize: 20,
                data_type: 'fil',
            },
            headers: {
                'token': this.props.location.state.userinfo.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
          } )
        .then((res) => {
            console.log(res);
            if(res.data.status === 200){
                let pagesize = Math.ceil(res.data.data.total/20);
                this.setState({
                    students: res.data.data.student,
                    pagesize: pagesize,
                })

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

    pagHandler( i ) {
        this.props.history.push({
            pathname: '/Portal/Admin/Students/' + i,
            state: { userinfo: this.state.userinfo },
        });
    }

    nameChangeHandler(event){
        this.setState({
            active: {
                ...this.state.active,
                sname: event.target.value,
            }
        })
    }

    toggleChangeHandler = (event) => {
        if(event.target.value === '男'){
            this.setState({
                isChecked: true,
            })
        }
        else{
            this.setState({
                isChecked: false,
            })
        }
    }

    classChangeHandler(event){
        this.setState({
            active: {
                ...this.state.active,
                stuclass: event.target.value,
            }
        })
    }

    majorChangeHandler(event){
        this.setState({
            active: {
                ...this.state.active,
                major: event.target.value,
            }
        })
    }



    render(){

        let buttonMargin = {
            marginLeft: '0.25em',
            marginRight: '0.25em',
        };

        let studentItems = null;
        if(this.state.students){
            studentItems = this.state.students.map( d => {
                return (
                    <tr key={d.sid} onClick={() => this.handleShow(d)} > 
                        <td>{d.sid}</td>
                        <td>{d.sname}</td>
                        <td>{d.gender}</td>
                        <td>{d.major}</td>
                        <td>{d.stuclass}</td>
                    </tr>
                );
            } ) 
        }

        console.log(this.state);
        let formModal = null;
        let items = [];
        if(this.state.pagesize){  
            for (let number = 1; number <= this.state.pagesize; number++) {
                items.push(
                <Pagination.Item key= {number} active = {number === this.state.pag} onClick={this.pagHandler.bind(this, number)} >
                {number}
                </Pagination.Item>,
            );
            }
        }

        const paginationBasic = (
            <div>
              <Pagination>{items}</Pagination>
              <br />
            </div>
          );

        if(this.state.active){
            formModal = (
                <Form onSubmit={this.submitHandler}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formSID">
                                    <Form.Label>用户名</Form.Label>
                                    <Form.Control value = {this.state.active.sid} disabled />
                                    </Form.Group>

                                    <Form.Group as={Col} sm id="formGender" onChange={this.toggleChangeHandler}>
                                        <Form.Label>性别</Form.Label>
                                        <fieldset>
                                        <Row>
                                            <Form.Check
                                            type="radio"
                                            label="男"
                                            value="男"
                                            name="gender"
                                            id="radioMale"
                                            checked={this.state.isChecked}
                                            />
                                            <Form.Check
                                            type="radio"
                                            label="女"
                                            value="女"
                                            name="gender"
                                            id="radioFemale"
                                            checked={!this.state.isChecked}
                                            />
                                        </Row>
                                        </fieldset>

                    </Form.Group>
                                </Form.Row>

                                <Row>
                                    <Form.Group as={Col} controlId="formName">
                                    <Form.Label>姓名</Form.Label>
                                    <Form.Control value = {this.state.active.sname} onChange = {(event) => this.nameChangeHandler(event)} />
                                    </Form.Group>
                                

                                </Row>

                                <Form.Row>
                                    <Form.Group as={Col} sm controlId="formClass">
                                    <Form.Label>班级</Form.Label>
                                    <Form.Control value = {this.state.active.stuclass} onChange={(event) => this.classChangeHandler(event)} />
                                    </Form.Group> 

                                    <Form.Group as={Col} sm controlId="formMajor">
                                    <Form.Label>专业</Form.Label>
                                    <Form.Control value = {this.state.active.major} onChange={(event) => this.majorChangeHandler(event)} />
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

        return(
            <React.Fragment>
                <br />
                <Table responsive striped>
                    <thead>
                        <tr>
                        <th>学号</th>
                        <th>姓名</th>
                        <th>性别</th>
                        <th>专业</th>
                        <th>班级</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentItems}
                    </tbody>
                </Table>

                <br />
                {paginationBasic}

                <Modal size = 'lg' show = {this.state.show} onHide = {this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>信息修改</Modal.Title>
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

export default withRouter(StudentInfo);

