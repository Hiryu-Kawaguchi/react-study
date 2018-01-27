import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {blue300, indigo900} from 'material-ui/styles/colors';

const styles = {
    chip: {
        margin: 5,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

class MyAwesomeReactComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            pitchers: [],
        };
        this.handleTouchDelete = this.handleTouchDelete.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
    }
    handleTouchDelete(i) {
        console.log('削除ボタンが押されました');
        let pit = this.state.pitchers;
        pit[i]["win"] = pit[i]["win"] - 2;
        this.setState({pitchers : pit});
    }
    handleTouchTap(i) {
        console.log('選択されました');
        let pit = this.state.pitchers;
        pit[i]["win"] = pit[i]["win"] + 1;
        this.setState({pitchers : pit});
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
                for(let pitcher in objects) {
                    if(objects.hasOwnProperty(pitcher)) {
                        objects[pitcher]['clicked'] = false;
                    }
                }
                this.setState({pitchers:objects});
            }
        );
    }

    renderPitchers(){
        return this.state.pitchers.map(
            (pitcher,index) => {
                return (
                    <Chip
                        backgroundColor='pink'
                        onRequestDelete={this.handleTouchDelete.bind(this,index)}
                        onTouchTap={this.handleTouchTap.bind(this,index)}
                        style={styles.chip}>
                        <Avatar size={32}>{pitcher.win}</Avatar>
                        {pitcher.name}
                    </Chip>
                );
            }
        );
    }
    render() {
        return (
            <MuiThemeProvider>
                <div style={{marginLeft:"10%",marginRight:"10%"}}>
                <AppBar
                    title="特徴とスキル"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <div style={styles.wrapper}>
                    {this.renderPitchers()}
                </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default MyAwesomeReactComponent;