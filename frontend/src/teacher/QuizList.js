import React, { Component } from 'react';
import QuizListItem from './QuizListItem';

class QuizList extends Component {
    render() {
        return (
            <div className="information-text">
                <h1>QuizList</h1>
                {this.props.quizes && this.props.quizes.map((curr) => {
                    return <QuizListItem key={curr.id} name={curr.name} id={curr.id} date={curr.date} />;
                })}
            </div>
        );
    }
}

export default QuizList;