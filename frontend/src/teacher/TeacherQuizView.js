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
            <div className="teacher-quiz-view">
                <div className="left-side">
                    <div className="quiz-question">
                        <div className="prompt">
                            <h2>Q: {this.props.prompt}</h2>
                        </div>
                        <div className="student-answers-container">
                            <VoteGallery prompt={this.props.prompt} type={this.props.type} answers={this.props.answers} onVote={null}/>
                        </div>
                        <div className={"teacher-quiz-view-control-buttons " + (this.state.allowingSubmissions ? "submission-period" : "voting-period")}>
                            <button onClick={this.handleEndSubmissions}>End Submissions</button>
                            <button onClick={this.handleNextQuestion}>Next Question</button>
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