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

    render() {
        return (
            <div className={"vote-submission"}>
                <p>{this.props.answer}</p>
                <div>
                    <label>👎</label>
                    <input type="range" min="-1" max="1"/>
                    <label>👍</label>
                </div>
            </div>
        );
    }
}

export default VoteSubmission;