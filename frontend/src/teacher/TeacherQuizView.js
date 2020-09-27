import React, { Component } from 'react';
import VoteGallery from "../student/VoteGallery";

/**
 * Props
 * - prompt: the prompt of this question
 * - type: type of this question
 * - answered: list of students that have already answered
 * - unanswered: list of students that have not answered yet
 * - answers: list of submitted answers
 */
class TeacherQuizView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allowingSubmissions: true,
        };
    }

    getAnswers = () => {
        return this.props.answers.map((answer) => (
            <p key={answer}>{answer}</p>
        ));
    }

    getUnanswered = () => {
        return this.props.unanswered.map((student) => (
            <p key={student}>{student}</p>
        ));
    }

    getAnswered = () => {
        return this.props.answered.map((student) => (
            <p key={student}>{student}</p>
        ));
    }

    handleEndSubmissions = () => {
        this.setState({
            allowingSubmissions: false,
        });
        this.props.onEndSubmission();
    }

    handleNextQuestion = () => {
        this.setState({
            allowingSubmissions: true,
        });
        this.props.onNextQuestion();
    }

    render() {
        return (
            <div className={"teacher-quiz-view " + (this.props.isQuizEnded ? 'quiz-ended' : 'quiz-ongoing')}>
                <div className="left-side">
                    <div className="quiz-question">
                        <div className="quiz-ended-message">
                            <div className="prompt"> {/* HACK: misusing prompt class */}
                                <h2>Quiz ended!</h2>
                            </div>
                        </div>
                        <div className="prompt">
                            <h2>Q: {this.props.prompt}</h2>
                        </div>
                        <div className="student-answers-container">
                            <VoteGallery prompt={this.props.prompt} type={this.props.type} answers={this.props.answers} onVote={null}/>
                        </div>
                        <div className={"teacher-quiz-view-control-buttons " + (this.state.allowingSubmissions ? "submission-period" : "voting-period")}>
                            <button onClick={this.handleEndSubmissions}>Close Submissions</button>
                            <button onClick={this.handleNextQuestion}>Next Question</button>
                        </div>
                    </div>
                </div>
                <div className="right-side">
                    <h1>{this.props.answered.length || 0} Answered</h1>
                    <div className="answered-students">
                        {this.getAnswered()}
                    </div>
                    <h1>{this.props.unanswered.length || 0} Unanswered</h1>
                    <div className="unanswered-students">
                        {this.getUnanswered()}
                    </div>
                </div>
            </div>
        );
    }
}

export default TeacherQuizView;