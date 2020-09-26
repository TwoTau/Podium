import React, { Component } from 'react';
import QuizListItem from './QuizListItem';

/**
 * Props
 * - onQuizStart: function with string parameter quizName
 */
class QuizList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="quiz-list information-text">
                {this.props.quizzes && this.props.quizzes.map((curr) => {
                    return <QuizListItem key={curr.name} name={curr.name} date={curr.created} onQuizStart={this.props.onQuizStart} />;
                })}
            </div>
        );
    }
}

export default QuizList;