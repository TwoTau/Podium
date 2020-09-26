import React, { Component } from 'react';

/**
 * Props
 * - quizes: all quizes under this teacher
 * - submitQuiz: submit a quiz to be saved to db and exit current page
 * - name?: string, will be non-null if editing a quiz
 */
class CreateQuiz extends Component
{
    constructor(props)
    {
        super(props);
        let quiz = {
            questions: [],
        };
        if (this.props.name) {
            for (const q of this.props.quizes) {
                if (q.name === this.props.name) {
                    quiz = q;
                }
            }
        }
        this.state = {
            name: this.props.name,
            quiz: quiz,
        };
    }

    onSubmit = () => {
        this.props.submitQuiz(this.state.quiz);
    }

    render() {
        return (
            <div className="information-text">
                <h1>CreateQuiz</h1>
                <h2>Quiz Name: </h2>
                <input type='text' value={this.state.quiz.name}></input>
                <div>
                    {this.state.quiz.questions.map((curr) =>
                    {
                    })}
                </div>
                <button onClick={this.onSubmit}></button>
            </div>
        );
    }
}

export default CreateQuiz;