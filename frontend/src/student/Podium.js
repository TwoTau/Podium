import React, { Component } from "react";
import Participant from "./Participant";

/**
 * Props:
 * - students: array of {username: string, score: int}
 */
class Podium extends Component {
    constructor(props) {
        super(props);
    }

    getDisplay() {
        this.props.students.sort((a, b) => (a.score > b.score) ? 1: -1);
        let participants = [];
        for (let i = 0; i < this.props.names.length; i++) {
            participants.push(
                <Participant name={this.props.students[i].username} score={this.props.students[i].score} rank={i + 1}/>
            )
        }
        return participants
    }

    render() {
        return (
            <div className={"podium"}>
                {this.getDisplay()}
            </div>
        );
    }
}

export default Podium;