import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";

/**
 * Props:
 * - type: the type of question
 * - student: string
 * - answer: string
 * - onVote: function to vote for a student
 */
class VoteSubmission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }

    onVote = (event) => {
        const answer = +event.target.value;
        this.setState({
            value: event.target.value,
        });
        this.props.onVote(this.props.student, answer);
    }

    getAnswer = () => {
        if (this.props.type === 'draw') {
            return (<CanvasDraw disabled hideGrid saveData={this.props.answer} canvasHeight={400} canvasWidth={400} />)
        } else {
            return (<p>Answer: {this.props.answer}</p>);
        }
    }

    render() {
        return (
            <div className="vote-submission">
                <div className="answer-box">
                    {this.getAnswer()}
                    <div className="student-box">
                        Student: {this.props.student}
                    </div>
                </div>
                <div className="vote-label" data-value={this.state.value}>
                    <label>👎</label>
                    <input type="range" min="-1" max="1" value={this.state.value} onChange={this.onVote} />
                    <label>👍</label>
                </div>
            </div>
        );
    }
}

export default VoteSubmission;