import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import './SingleDutyDay.css';

const SingleDutyDay = (props) => {
    
    let same_date_member_items = props.SDM.map( d => {
        return (
            <tr  key = {d.sid}>
                <td>{d.sid}</td>
                <td>{d.sname}</td>
                <td>{d.pnumber}</td>
                <td>{d.stuclass}</td>
                <td>{d.mposition}</td>
            </tr>
        );
    } )

    let duties_items = props.duties.map( d => {
        return (
            <tr key={d.ddate}>
                <td>{d.dgroup}</td>
                <td>{d.dweek}</td>
                <td>{d.ddate}</td>
            </tr>
        );
    } )

    
    return(
        <React.Fragment>
            <h3>同组成员信息</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>学号</th>
                    <th>姓名</th>
                    <th>手机号码</th>
                    <th>班级</th>
                    <th>职位</th>
                    </tr>
                </thead>
                <tbody>
                    {same_date_member_items}
                </tbody>
            </Table>
            <br />

            <h3>我的值班日期</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>组别</th>
                    <th>周次</th>
                    <th>日期</th>

                    </tr>
                </thead>
                <tbody>
                    {duties_items}
                </tbody>
            </Table>
        </React.Fragment>
    )
}

export default SingleDutyDay;