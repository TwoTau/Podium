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
        let galleryInside = <h2 className="no-submissions-yet">No submissions yet</h2>
        if (this.props.answers.length) {
            galleryInside = this.props.answers.map(s => (
                <VoteSubmission type={this.props.type} key={s.student} student={s.student} answer={s.answer} votes={s.votes} onVote={this.props.onVote} />
            ));
        }
        return (
            <div className={"vote-gallery-container " + (this.props.answers.length ? 'show' : 'hide')}>
                <div className="prompt">
                    <h2><span className="vote-heading">VOTE</span> {this.props.prompt}</h2>
                </div>
                <div className="vote-gallery">
                    {galleryInside}
                </div>
            </div>
        );
    }
}

export default VoteGallery;