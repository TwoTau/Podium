import React, { Component } from "react";

/**
 * Props:
 * - student: string
 * - answer: string
 */
class VoteSubmission extends Component {
    constructor(props) {
        super(props);
    }
    onVote = (event) => {
        const answer = document.querySelector("." + this.props.student).value;
        this.props.onVote(this.props.student, answer);
    }

    render() {
        return (
            <div className={"vote-submission"}>
                <p>{this.props.answer}</p>
                <div>
                    <label>👎</label>
                    <input type="range" min="-1" max="1" id={this.props.student} onChange={this.onVote}/>
                    <label>👍</label>
                </div>
            </div>
        );
    }
}

export default VoteSubmission;