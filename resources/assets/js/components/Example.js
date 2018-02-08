import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyRoute from './MyRoute';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default class Example extends Component {

    render(){
        return (
            <MuiThemeProvider>
                <MyRoute />
            </MuiThemeProvider>
        );
    }
}

 if (document.getElementById('example')) {
     ReactDOM.render(<Example />, document.getElementById('example'));
 }
