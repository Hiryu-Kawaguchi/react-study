import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Example extends Component {
    constructor() {
        super();
        this.state = {
            pitchers: [],
            count: 0,
            pitcherwin:0
        };
    }
    componentDidMount() {
        fetch('/api/foo').then(
            response => {
                return response.json();
            }
        ).then(
            objects => {
                this.setState({pitchers:objects});
                this.setState({pitcherwin:objects[0]["win"]});
            }
        );
    }
    renderPitchers(){
        return this.state.pitchers.map(
            (pitcher,index) => {
                return (
                    <li key={pitcher.key} id={pitcher.key}>
                        <p>スキル : {pitcher.name}</p>
                        <p onClick={this.addWin.bind(this,index)}>スコア : {pitcher.win}</p>
                        <p>防御率 : {pitcher.era}</p>
                    </li>
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
                                <ul>
                                    {this.renderPitchers()}
                                </ul>
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
