import React, { Component } from "react";

/**
 * Props:
 * - mode: 'read' or 'edit'
 */
class QuizQuestionCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"quiz-question-card"}>
                <div className={"card-prompt"}>
                    <h2>Prompt: </h2>
                    <div className={"text-field"} contentEditable={"true"} placeholder={"Enter question here"}/>
                </div>
                <div className={"question-type-selector"}>
                    <h2>Question Type:</h2>
                    <select className={"question-type-dropdown"}>
                        <option value={"drawing"}>Drawing</option>
                        <option value={"short-answer"}>Short Answer</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default QuizQuestionCard;