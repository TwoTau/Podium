import React, { Component } from 'react';

class QuizListItem extends Component {
    render() {
        return (
            <div>
                <h1>QuizListItem</h1>
                <div>
                    <h1>{this.props.name}</h1>
                    <h1>{this.props.id}</h1>
                    <h1>{this.props.date.toString()}</h1>
                </div>
            </div>
        );
    }
}

export default QuizListItem;