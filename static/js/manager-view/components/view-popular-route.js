import React, { Component }from 'react';
import { Link } from 'react-router';
import ButtonLink from '../../shared/button-link';

class ViewPopularRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report: []
        };
        this.sendGetReq = this.sendGetReq.bind(this);
    }
    sendGetReq() {
        fetch('/api/popular-routes', {
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
                <div key={row['depart_month1'] + row['TrainNumber']}>
                    <span className='report-col'>{row['depart_month1']}</span>
                    <span className='report-col'>{row['TrainNumber']}</span>
                    <span className='report-col'>{row['C_T']}</span>
                </div>
            );
        }); 
        return (  
            <div className='page-container' id='popular-routes'>
                <h1>Popular Route Report</h1>
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

export default ViewPopularRoute;