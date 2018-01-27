import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import MyAwesomeReactComponent from './MyAwesomeReactComponent';

class MyRoute extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        {/*<li><Link to='/test/react/about'>About</Link></li>*/}
                        <li><Link to='/Profile'>Profile</Link></li>
                    </ul>
                    <hr />
                    <Route exact path='/' component={Home} />
                    {/*<Route path='/test/react/about' component={MyAwesomeReactComponent} />*/}
                    <Route path='/Profile' component={MyAwesomeReactComponent} />
                </div>
            </BrowserRouter>
        );
    }
}

const Home = () => (
    <div>
        <h2>Home</h2>
        <p>Welcome to ようこそ</p>
    </div>
)

export default MyRoute;