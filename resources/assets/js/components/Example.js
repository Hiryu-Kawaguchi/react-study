import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Example extends Component {
    constructor() {
        super();
        this.state = {
            pitchers: []
        };
    }
    componentDidMount() {
        fetch('/api/foo').then(
            response => {
                return response.json();
            }
        ).then(
            objects => {
                objects.sort((a, b) => {
                    if (a.win < b.win) return 1;
                    if (a.win > b.win) return -1;
                    return 0;
                });
                this.setState({pitchers:objects});
            }
        );
    }
    renderPitchers(){
        return this.state.pitchers.map(
            (pitcher,index) => {
                return (
                    <div key={pitcher.key} style={{display:"inline-flex"}}>
                        <span>{pitcher.name}</span>
                    <div className="maru size_normal pink1">
                        <div className="letter3" onClick={this.addWin.bind(this,index)}>{pitcher.win}</div>
                    </div>
                    </div>
                );
            }
        );
    }

    addWin(i) {
        let pit = this.state.pitchers;
        pit[i]["win"] = pit[i]["win"] + 1;
        this.setState({pitchers : pit});
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">Example Component</div>
                            <div className="panel-body">
                                    {this.renderPitchers()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
