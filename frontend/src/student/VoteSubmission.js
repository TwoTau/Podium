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
    }

    onVote = (event) => {
        const answer = document.querySelector("." + this.props.student).value;
        this.props.onVote(this.props.student, answer);
    }

    getAnswer = () => {
        if (this.props.type === 'draw') {
            return (<CanvasDraw disabled hideGrid saveData={this.props.answer} canvasHeight={400} canvasWidth={400} />)
        } else {
            return (<p>{this.getAnswer()}</p>);
        }
    }

    render() {
        return (
            <div className={"vote-submission"}>
                <div className="answer-box">
                    {this.getAnswer()}
                </div>
                <div className="vote-label">
                    <label>👎</label>
                    <input type="range" min="-1" max="1" id={this.props.student} onChange={this.onVote} />
                    <label>👍</label>
                </div>
            </div>
        );
    }
}

export default VoteSubmission;