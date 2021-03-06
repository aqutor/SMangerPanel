import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Form,  Col, Button, Row } from 'react-bootstrap';
import axios from 'axios';


class Add extends Component {

    state = {
        userinfo: null,
        purl: null,
        vdate: null,
        uploadMsg: null,
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

    componentDidUpdate () {
        console.log(this.state);
    }

    dateChangeHandler = event => {
        this.setState({
            vdate: event.target.value.replace(/-/g,''),
        })
    }

    picChangeHandler = (event) => {
        if(event.target.value){
            let formData = new FormData();
            formData.append("smfile", event.target.files[0]);
            axios.post('https://sm.ms/api/v2/upload', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => {
                if(res.data.success === true){
                    this.setState({
                        uploadMsg: '图片上传成功',
                        purl: res.data.data.url,
                    })
                }
                else{
                    this.setState({
                        uploadMsg: res.data.message,
                    })
                }

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

        
        if(!this.state.vdate){
            alert('违规日期未填写');
            return;
        }
        else {
            upData.append('vdate',this.state.vdate);
        }

        if(!this.state.purl){
            alert('图片未上传');
            return;
        }
        else {
            upData.append('purl',this.state.purl);
        }

        let config = {
            headers: {
                'token': this.state.userinfo.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }

        axios.post('/api/vio_info', upData, config)
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
                <h1 style = {{textAlign: 'center', marginBottom: '0.5em', marginTop: '0.5em'}}>添加违规记录</h1>

                <Form onSubmit={this.submitHandler}>
                    <Row>
                        <Form.Group as={Col} controlId="formDate">
                            <Form.Label>日期</Form.Label>
                            <Form.Control type = 'date' onChange = {(event) => this.dateChangeHandler(event)} />
                        </Form.Group>
                    </Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formImg">
                        <Form.Label>图片</Form.Label>
                        <Form.Control type = 'file' accept="image/*" onChange = {(event) => this.picChangeHandler(event)} />
                        <Form.Label><div style = {{color: 'blue', fontSize: '12px'}}> {this.state.uploadMsg}</div></Form.Label>
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

