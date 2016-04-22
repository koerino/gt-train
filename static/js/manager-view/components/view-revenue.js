import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../shared/button-link';
import 'whatwg-fetch';

class ViewRevenue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report: []
        };
        this.sendGetReq = this.sendGetReq.bind(this);
    }
    sendGetReq() {
        fetch('/api/revenue', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => this.setState({report: data}))
            .catch(err => console.log(err));
    }
    componentWillMount() {
        this.sendGetReq();
    }
    render() {
        var report = this.state.report;
        var rows = [];
        if (report) report.map(function(row) {
            rows.push(
                <div key={row['depart_month1'] + row['SUM(total_spend)']}>
                    <span className='report-col'>{row['depart_month1']}</span>
                    <span className='report-col'>{row['SUM(total_spend)']}</span>
                </div>
            );
        }); 
        return (  
            <div className='page-container' id='revenue'>
                <h1>Revenue Report</h1>
                <div className='content'>
                    {rows}
                    <div>
                        <Link to='admin'><ButtonLink label='Back' colour='blue' /></Link>
                    </div>
                </div>
            </div>
        );    
    }
}

export default ViewRevenue;