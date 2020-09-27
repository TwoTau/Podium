import React, { Component } from "react";
import VoteSubmission from "./VoteSubmission";

/**
 * Props:
 * - prompt: the question being answered
 * - type: the type of question
 * - answers: array of {student: string, answer: string}
 * - onVote: function to vote for a student
 */
class VoteGallery extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>{`Q: ${this.props.prompt}`}</h1>
                <div className={"vote-gallery"}>
                    {this.props.answers.map(s => (
                        <VoteSubmission type={this.props.type} key={s.student} student={s.student} answer={s.answer} onVote={this.props.onVote} />
                    ))}
                </div>
            </div>
        );
    }
}

export default VoteGallery;