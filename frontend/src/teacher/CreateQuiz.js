import React, { Component } from 'react';

/**
 * Props
 * - quizzes: all quizzes under this teacher
 * - submitQuiz: submit a quiz to be saved to db, sets created time, and exit current page
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
        this.takenNames = new Set();
        for (const q of this.props.quizzes) {
            this.takenNames.add(q.name);
            if (q.name === this.props.name) {
                quiz = q;
            }
        }
        this.state = {
            name: this.props.name,
            quiz: quiz,
        };
        console.log(this.state.quiz)
    }

    onSubmit = () => {
        this.props.submitQuiz(this.state.quiz);
    }

    updateQuizName(event)
    {
        this.state.quiz.name = event.target.value;
    }

    render()
    {
        return (
            <div className="information-text">
                <h1>CreateQuiz</h1>
                <h2>Quiz Name: </h2>
                <input type='text' onChange={this.updateQuizName.bind(this)}></input>
                <label value={this.state.quiz.name}></label>
                <div>
                    {this.state.quiz.questions.map((curr) =>
                    {
                    })}
                </div>
                <button onClick={this.onSubmit}>Publish quiz</button>
            </div>
        );
    }
}

export default CreateQuiz;