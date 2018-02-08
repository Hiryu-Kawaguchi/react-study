import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import {blue300, indigo900,pink50} from 'material-ui/styles/colors';

const styles = {
    chip: {
        margin: 5,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

const buttonStyle = {
    marginRight: 20,
};

class MyAwesomeReactComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            skills: [],
            user:localStorage.getItem('user_id'),
            token:'',
            newSkill:[],
        };
        this.handleTouchDelete = this.handleTouchDelete.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
        this.addSkill = this.addSkill.bind(this);
    }
    addSkill(){
         let data = new FormData();
         data.append('name', this.state.newSkill);
         data.append('userid', this.props.match.params.user);
        fetch('/api/skillset',{
            method: 'POST',
            body: data,
        }).then(
            response => {
                return response.json();
            }
        ).then(
            objects => {
                objects.sort((a, b) => {
                    if (a.votes < b.votes) return 1;
                    if (a.votes > b.votes) return -1;
                    return 0;
                });
                this.setState({skills:objects});
                this.setState({newSkill:['']});
            }
        );
    }
    handleTouchDelete(i) {
        console.log('削除ボタンが押されました');
        let skills = this.state.skills;
        let data = new FormData();
        data.append('userid', this.props.match.params.user);
        data.append('skillid', skills[i]["skill_id"]);
        fetch('/api/skill/delete',{
            method: 'POST',
            body: data,
        }).then(
            response => {
                return response.json();
            }
        ).then(
            objects => {
                this.setState({skills:objects});
            }
        );
    }
    handleTouchTap(i) {
        console.log('選択されました');
        let skills = this.state.skills;
        skills[i]["votes"] = skills[i]["votes"] + 1;
        let data = new FormData();
        data.append('userid', this.props.match.params.user);
        data.append('skillid', skills[i]["skill_id"]);
        data.append('votes', skills[i]["votes"]);
        fetch('/api/skill/vote',{
            method: 'POST',
            body: data,
        }).then(
            response => {
                return response.json();
            }
        ).then(
            objects => {
                this.setState({skills:objects});
            }
        );
    }
    handleUpdateInput(value){
        this.setState({
            newSkill: [value],
        });
    };
    componentDidMount() {
        fetch('/api/skillset/'+this.props.match.params.user,{
            method: 'GET',
        }).then(
            response => {
                return response.json();
            }
        ).then(
            objects => {
                objects.sort((a, b) => {
                    if (a.votes < b.votes) return 1;
                    if (a.votes > b.votes) return -1;
                    return 0;
                });
                for(let i in objects) {
                    if(objects.hasOwnProperty(i)) {
                        objects[i]['clicked'] = false;
                    }
                }
                this.setState({skills:objects});
            }
        );

    }

    renderskills(){
        return this.state.skills.map(
            (skillscher,index) => {
                return (
                    <Chip
                        backgroundColor={pink50}
                        onRequestDelete={this.handleTouchDelete.bind(this,index)}
                        onTouchTap={this.handleTouchTap.bind(this,index)}
                        style={styles.chip}>
                        <Avatar size={32}>{skillscher.votes}</Avatar>
                        {skillscher.skill_name}
                    </Chip>
                );
            }
        );
    }
    render() {
        return (
                <div style={{marginLeft:"10%",marginRight:"10%"}}>
                <AppBar
                    title="特徴とスキル"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <AutoComplete
                    hintText="新しいスキル"
                    dataSource={this.state.newSkill}
                    onUpdateInput={this.handleUpdateInput}
                />
                <FloatingActionButton style={buttonStyle} mini={true} onClick={this.addSkill.bind(this)}>
                    <ContentAdd />
                </FloatingActionButton>
                <div style={styles.wrapper}>
                    {this.renderskills()}
                </div>
                </div>
        );
    }
}

export default MyAwesomeReactComponent;