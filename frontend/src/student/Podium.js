import React, { Component } from "react";
import Participant from "./Participant";

/**
 * Props:
 * - names: string[]
 * - scores: number[]
 */
class Podium extends Component {
    constructor(props) {
        super(props);
    }

    getDisplay() {
        let participants = [];
        for (let i = 0; i < this.props.names.length; i++) {
            participants.push(
                <Participant name={this.props.names[i]} score={this.props.scores[i]} rank={i + 1}/>
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