import React, { Component } from 'react';

/**
 * Props
 * - name: string
 * - date: string
 * - onQuizStart: function with string parameter quizName
 */
class QuizListItem extends Component {
    constructor(props) {
        super(props);
    }

    onQuizStart = () => {
        this.props.onQuizStart(this.props.name);
    }

    render() {
        return (
            <div className="quiz-list-item information-text">
                <div>
                    <h2>{this.props.name}</h2>
                    <h3>Created on {this.props.date}</h3>
                    <button className='start-quiz' onClick={this.onQuizStart}>Start quiz</button>
                    <button className='edit-quiz' disabled>Edit quiz</button> {/* TODO */}
                </div>
            </div>
        );
    }
}

export default QuizListItem;