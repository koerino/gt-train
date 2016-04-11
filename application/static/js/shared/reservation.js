/*import React, {Component} from 'react';

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entrys: []
        };
    }
    render() {
        return (
            <div>
                <div>
                    { 
                        Object.keys(this.state.entrys[0]).map(function(key) {
                            return <span>{key}</span>;
                        });   
                    }
                </div>
                <div>
                    {
                        this.state.entrys.map(function(entry) {
                            return 
                                <div>
                                { 
                                    for (key in entry) {
                                        return <span>{ entry[key] }</span>;
                                    }
                                }
                                </div>
                        });
                    }
                </div>
            </div>
        );
    }
}

export default Reservation;*/