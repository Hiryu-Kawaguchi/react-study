import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'

const App = () => (
    <BrowserRouter>
        <div>
            <ul>
                <li><Link to='/test/react'>Home</Link></li>
                <li><Link to='/test/react/about'>About</Link></li>
                <li><Link to='/test/react/friends'>Friends</Link></li>
            </ul>
            <hr />
            <Route exact path='/test/react' component={Home} />
            <Route path='/test/react/about' component={About} />
            <Route path='/test/react/friends' component={Friends} />
        </div>
    </BrowserRouter>
)

const Home = () => (
    <div>
        <h2>Home</h2>
        <p>Welcome to ようこそ</p>
    </div>
)
const About = () => (
    <div>
        <h2>About</h2>
        <p>フレンズに投票するページです</p>
    </div>
)
class Friends extends Component {
    constructor() {
        super()
        this.state = {}
        this.handleVote = this.handleVote.bind(this)
    }

    componentWillMount() {
        FRIENDS.forEach(friend => {
            this.setState({
                ...this.state,
                [friend.id]: 0
            })
        })
    }

    handleVote(id) {
        this.setState({
            [id]: this.state[id] + 1
        })
    }

    render() {
        return (
            <div>
                <h2>Friends</h2>
                <Route exact path='/test/react/friends' render={props => <FriendList handleVote={this.handleVote} />} />
                <Route path='/test/react/friends/:id' render={props => <Friend match={props.match} votes={this.state} />} />
            </div>
        )
    }
}
const FRIENDS = [
    {
        id: 'serval',
        nameJa: 'サーバル',
        nameEn: 'Serval Cat',
        family: 'ネコ目ネコ科ネコ属'
    },
    {
        id: 'raccoon',
        nameJa: 'アライグマ',
        nameEn: 'Common raccoon',
        family: 'ネコ目アライグマ科アライグマ属'
    },
    {
        id: 'fennec',
        nameJa: 'フェネック',
        nameEn: 'Fennec',
        family: 'ネコ目イヌ科キツネ属'
    }
]

const friendById = id => FRIENDS.find(friend => friend.id === id)
const FriendList = props => (
    <div>
        {FRIENDS.map(friend => (
            <li key={friend.id}>
                <Link to={`/test/react/friends/${friend.id}`}>{friend.nameJa}</Link>
                <button onClick={() => props.handleVote(friend.id)}>+</button>
            </li>
        ))}
    </div>
)

const Friend = props => {
    const { id } = props.match.params
    const friend = friendById(id)

    if (typeof friend === 'undefined')  {
        return (
            <div>
                <p>Friends with id '{id}' does not exist.</p>
            </div>
        )
    }
    const containerStyle = { border: '1px gray solid', display: 'inline-block', padding: 10 }
    const contentsStyle = { margin: 0 }

    return (
        <div>
            <div style={containerStyle}>
                <p style={contentsStyle}>{friend.family}</p>
                <h1 style={contentsStyle}>{friend.nameJa}</h1>
                <p style={contentsStyle}>{friend.nameEn}</p>
            </div>
        </div>
    )
}

export default App

// if (document.getElementById('example')) {
//     ReactDOM.render(<App />, document.getElementById('example'));
// }