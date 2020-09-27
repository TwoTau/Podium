import React, { Component } from "react";
import VoteSubmission from "./VoteSubmission";

/**
 * Props:
 * - answers: array of {student: string, answer: string}
 * - onVote: function to vote for a student
 */
class VoteGallery extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className={"vote-gallery"}>
                {this.props.answers.map(s => (
                    <VoteSubmission key={s.student} student={s.student} answer={s.answer} onChange={this.props.onVote}/>
                ))}
            </div>
        );
    }
}

export default VoteGallery;