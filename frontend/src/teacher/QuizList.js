import React, { Component } from 'react';
import QuizListItem from './QuizListItem';

class QuizList extends Component {
    render() {
        return (
            <div>
                <h1>QuizList</h1>
                {this.props.quizzes && this.props.quizzes.map((curr) => {
                    return <QuizListItem key={curr.name} name={curr.name} date={curr.created} />;
                })}
            </div>
        );
    }
}

export default QuizList;