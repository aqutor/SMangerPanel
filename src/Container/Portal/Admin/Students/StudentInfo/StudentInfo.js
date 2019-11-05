import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import { Table,  Modal, Button, Row, Form, Col, Pagination } from 'react-bootstrap';


class StudentInfo extends Component {
    
    state = {
        userinfo: null,
        active: null,
        pag: 1,
        pagesize: null,
        students: null,
        show: false,
        showAdd: false,
        isChecked: null,
        isAddChecked: null,
        adduser: {
            sid: null,
            sname: null,
            stuclass: null,
            gender: null,
            major: null,
        }
    }

    componentDidMount () {
        if(this.props.match.params.id) {
            this.setState({
                pag: this.props.match.params.id
            })
        }

        if(this.props.location.state){
            this.setState({
                userinfo: this.props.location.state.userinfo,
            });
        }

        console.log(this.props);
        this.loadData();
    }

    componentDidUpdate(){
        console.log(this.state)
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
    }

    // handle add modal

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

    addSIDHandler = (event) => {
        this.setState({
            adduser: {
                ...this.state.adduser,
                sid: event.target.value,
            }
        })
    }

    addNameHandler = (event) => {
        this.setState({
            adduser: {
                ...this.state.adduser,
                sname: event.target.value,
            }
        })
    }

    addClassHandler = (event) => {
        this.setState({
            adduser: {
                ...this.state.adduser,
                stuclass: event.target.value,
            }
        })
    }

    addGenderHandler = (event) => {
        if(event.target.value === '男'){
            this.setState({
                isAddChecked: true,
                adduser: {
                    ...this.state.adduser,
                    gender: '男',
                }
            })
        }
        else{
            this.setState({
                isAddChecked: false,
                adduser: {
                    ...this.state.adduser,
                    gender: '女',
                }
            })
        }
    }

    addMajorHandler = (event) => {
        this.setState({
            adduser: {
                ...this.state.adduser,
                major: event.target.value,
            }
        })
    }

    addSubmitHandler = (event) => {
        event.preventDefault();
        let upData = new FormData();

        upData.append('sid',this.state.adduser.sid);

        upData.append('sname',this.state.adduser.sname);

        upData.append('stuclass',this.state.adduser.stuclass);

        upData.append('gender',this.state.isAddChecked);

        upData.append('major',this.state.adduser.major);



        let config = {
            headers: {
                'token': this.state.userinfo.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }

        axios.post('/api/student/manage', upData, config)
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

    // end of handle add modal


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

    deleteHandler = () => {
        if(this.state.active){
            axios.delete('/api/student/manage', {
                params: {
                    sid: this.state.active.sid
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
                active: {
                    ...this.state.active,
                    gender: '男',
                }
            })
        }
        else{
            this.setState({
                isChecked: false,
                active: {
                    ...this.state.active,
                    gender: '女',
                }
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

    submitHandler = (event) => {
        event.preventDefault();
        let upData = new FormData();

        upData.append('sid',this.state.active.sid);

        upData.append('sname',this.state.active.sname);

        upData.append('stuclass',this.state.active.stuclass);

        upData.append('gender',this.state.isChecked);

        upData.append('major',this.state.active.major);



        let config = {
            headers: {
                'token': this.state.userinfo.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }



            axios.put('/api/student/manage', upData, config)
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
        
        let formModalAdd = (
            <Form onSubmit={this.addSubmitHandler}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formSID">
                    <Form.Label>用户名</Form.Label>
                    <Form.Control value = {this.state.adduser.sid} onChange = {(event) => this.addSIDHandler(event)} />
                    </Form.Group>

                    <Form.Group as={Col} sm id="formGender" value = {this.state.adduser.gender} onChange = {this.addGenderHandler} >
                        <Form.Label>性别</Form.Label>
                        <fieldset>
                        <Row>
                            <Form.Check
                            type="radio"
                            label="男"
                            value="男"
                            name="gender"
                            id="radioMale"
                            
                            />
                            <Form.Check
                            type="radio"
                            label="女"
                            value="女"
                            name="gender"
                            id="radioFemale"
                            
                            />
                        </Row>
                        </fieldset>

            </Form.Group>
                </Form.Row>

                <Row>
                    <Form.Group as={Col} controlId="formName">
                    <Form.Label>姓名</Form.Label>
                    <Form.Control value = {this.state.adduser.sname} onChange = {(event) => this.addNameHandler(event)} />
                    </Form.Group>
                </Row>

                <Form.Row>
                    <Form.Group as={Col} sm controlId="formClass">
                    <Form.Label>班级</Form.Label>
                    <Form.Control value = {this.state.adduser.stuclass} onChange = {(event) => this.addClassHandler(event)} />
                    </Form.Group> 

                    <Form.Group as={Col} sm controlId="formMajor">
                    <Form.Label>专业</Form.Label>
                    <Form.Control value = {this.state.adduser.major} onChange = {(event) => this.addMajorHandler(event)} />
                    </Form.Group> 
                </Form.Row>

                <div className = 'col text-center'>
                    <Button style = {buttonMargin} variant="primary" type="submit">
                     提交 
                    </Button>

                    <Button variant="danger" style = {buttonMargin} onClick = {this.deleteHandler}>
                     删除学生 
                    </Button>

                    <Button variant="secondary" style = {buttonMargin} onClick = {this.handleCloseAdd}>
                     关闭 
                    </Button>
                </div>
            </Form>
            )
        

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
                                     删除学生 
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
                <Button style={{marginLeft: '2em',}} variant="outline-info" onClick = {this.handleShowAdd} >添加学生</Button>
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
                <p>分页功能暂未优化且不可用。</p>
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

                <Modal size = 'lg' show = {this.state.showAdd} onHide = {this.handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>添加学生</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            {formModalAdd}
                        </Modal.Body>
                    <Modal.Footer>
                        
                    </Modal.Footer>
                </Modal>
                
            </React.Fragment>
        )
    }
}

export default withRouter(StudentInfo);

