import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link , Redirect, withRouter} from 'react-router-dom'
import MyAwesomeReactComponent from './MyAwesomeReactComponent';

class MyRoute extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <AuthButton/>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        {/*<li><Link to='/test/react/about'>About</Link></li>*/}
                        <li><Link to='/Profile'>Profile</Link></li>
                    </ul>
                    <hr />
                    <Route exact path='/' component={Home} />
                    {/*<Route path='/test/react/about' component={MyAwesomeReactComponent} />*/}
                    <Route path="/login" component={Login}/>
                    <PrivateRoute path='/Profile' component={MyAwesomeReactComponent} />
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
);

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100)
    }
};

const AuthButton = withRouter(({ history }) => (
    fakeAuth.isAuthenticated ? (
        <p>
            Welcome! <button onClick={() => {
            fakeAuth.signout(() => {
                history.push('/');
                localStorage.removeItem('token');
                localStorage.removeItem('user_id');
            })
        }}>Sign out</button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    )
));

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        fakeAuth.isAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
);

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false
        };
        this.login = this.login.bind(this);
    }

    login(){
        // fakeAuth.authenticate(() => {
        //     this.setState({ redirectToReferrer: true })
        // })
        let data = new FormData();
        data.append('email','adams.aubree@example.org');
        data.append('password','secret');
        fetch('/api/authenticate',{
            method: 'POST',
            body: data
        }).then(
            response => {
                return response.json();
            }
        ).then(
            objects => {
                localStorage.setItem('user_id', objects['user']['id']);
                localStorage.setItem('token', objects['token']);
            }
        );
        if(!localStorage.getItem('token')){
            fakeAuth.authenticate();
            this.setState({redirectToReferrer: true});
        }
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };

        if (this.state.redirectToReferrer) {
            return (
                <Redirect to={from}/>
            )
        }

        return (
            <div>
                <p>ログインをお願いします {from.pathname}</p>
                <button onClick={this.login}>Log in</button>
            </div>
        )
    }
}

export default MyRoute;