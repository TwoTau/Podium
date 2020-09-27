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

    render() {
        return (
            <div className="podium">
                {this.props.students.sort((a, b) => b.score - a.score).map((s, i) => (
                    <Participant key={s.username} name={s.username} score={s.score} rank={i + 1}/>
                ))}
            </div>
        );
    }
}

export default Podium;