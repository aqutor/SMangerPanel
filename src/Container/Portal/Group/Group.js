import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

class Group extends Component {

    state = {
        arranged: null,
        isarranged: null,
    }

    componentDidMount(){
        this.loadData();
    }

    loadData () {
        axios.get('/api/duty/arrange', {
            headers: {
                'token': this.props.location.state.userinfo.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
          } )
        .then((res) => {
            console.log(res);
            if(res.data.status === 200){
                this.setState({
                    arranged: res.data.data.arranged,
                    isarranged: res.data.data.isarranged,
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

    render(){
        let arrangeItems = null;
        if (this.state.arranged) {
            arrangeItems = ( this.state.arranged.map( d => {
                let key = d.ddate;
                return (
                    <tr key={key} > 
                        <td>{d.ddate}</td>
                        <td>{d.dweek}</td>
                        <td>{d.dgroup}</td>
                    </tr>
                )
            })

            )
        }

        let formInfo = null;
        if (!this.state.isarranged && this.state.isarranged !== null)  {
            formInfo = (
                <h3 style = {{textAlign: 'center', marginTop: '1em'}}>排班尚未完成</h3>
            )
        }
        
        else if (this.state.isarranged){
            formInfo = (
                <Table responsive striped style = {{maxWidth: '700px', margin: 'auto'}}>
                    <thead>
                        <tr>
                        <th>日期</th>
                        <th>周次</th>
                        <th>分组</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrangeItems}
                    </tbody>
                </Table>
            )
        }
        console.log(this.state);
        return(
            <React.Fragment>
                <h2 style = {{textAlign: 'center', marginTop: '1em', marginBottom: '1em'}}>分组信息</h2>
                {formInfo}
            </React.Fragment>
        )
    }
}

export default withRouter(Group);

