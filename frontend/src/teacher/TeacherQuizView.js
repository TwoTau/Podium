import React, { Component } from 'react';

/**
 * Props
 * - prompt: the prompt of this question
 * - answered: list of students that have already answered
 * - unanswered: list of students that have not answered yet
 * - answers: list of submitted answers
 */
class TeacherQuizView extends Component {
    constructor(props) {
        super(props);
    }

    getAnswers = () => {
        return this.props.answers.map(answer => (
            <p>answer</p>
        ))
    }

    getUnanswered = () => {
        return this.props.unanswered.map(student => (
            <p>{student.username || 'Anonymous'}</p>
        ))
    }

    getAnswered = () => {
        return this.props.answered.map(student => (
            <p>{student.username || 'Anonymous'}</p>
        ))
    }

    handleNextQuestion = () => {
        this.props.onNextQuestion();
    }

    render() {
        return (
            <div>
                <div className="left-side">
                    <div className="quiz-question">
                        <div className="prompt">
                            <h2>Q: {this.props.prompt}</h2>
                        </div>
                        <div className="student-answers-container">
                            {this.getAnswers()}
                        </div>
                        <div>
                            <button onClick={this.handleNextQuestion}>Next</button>
                        </div>
                    </div>
                </div>
                <div className="right-side">
                    <h1>{`Unanswered (${this.props.unanswered.length || 0})`}</h1>
                    <div>
                        {this.getUnanswered()}
                    </div>
                    <h1>{`Answered (${this.props.answered.length || 0})`}</h1>
                    <div>
                        {this.getAnswered()}
                    </div>
                </div>
            </div>
        );
    }
}

export default TeacherQuizView;