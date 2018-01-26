import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            title: 'スキル・特徴ページ'
        };
    }
    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <span>{this.props.name}</span>
            </div>
        );
    }
}