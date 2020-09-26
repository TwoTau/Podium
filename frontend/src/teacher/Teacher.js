import React, { Component } from "react";
import StudentList from './StudentList';
import CreateInstaQuiz from './CreateInstaQuiz';
import CreateQuiz from './CreateQuiz';
import QuizList from './QuizList';

class Teacher extends Component {
    contentStates = {
		STUDENT_LIST: 'StudentList',
		QUIZ_LIST: 'QuizList',
		CREATE_QUIZ: 'CreateQuiz',
		INSTA_QUIZ: 'InstaQuiz',
    }

    constructor(props)
    { 
        super(props);
        this.state = {
			content: <StudentList />,
			contentType: this.contentStates.STUDENT_LIST,
        };
	}
	
	viewStudentList = () =>
	{ 
		if (this.state.contentType !== this.contentStates.STUDENT_LIST)
		{
			this.setState({
				content: <StudentList />,
				contentType: this.contentStates.STUDENT_LIST,
			});
		}
	}
	
	viewQuizList = () =>
	{ 
		if (this.state.contentType !== this.contentStates.QUIZ_LIST)
		{
			this.setState({
				content: <QuizList />,
				contentType: this.contentStates.QUIZ_LIST,
			});
		}
	}
	
	viewCreateQuiz = () =>
	{ 
		if (this.state.contentType !== this.contentStates.CREATE_QUIZ)
		{
			this.setState({
				content: <CreateQuiz />,
				contentType: this.contentStates.CREATE_QUIZ,
			});
		}
	}
	
	viewInstaQuiz = () =>
	{ 
		if (this.state.contentType !== this.contentStates.INSTA_QUIZ)
		{
			this.setState({
				content: <CreateInstaQuiz />,
				contentType: this.contentStates.INSTA_QUIZ,
			});
		}
	}

	render() {
		return (
            <div>
                <div>
                    <button onClick={this.viewStudentList}>View Student List</button>
                    <button onClick={this.viewQuizList}>Quiz List</button>
                    <button onClick={this.viewCreateQuiz}>Create Quiz</button>
                    <button onClick={this.viewInstaQuiz}>Poll Singe Quiz Question</button>
                </div>
				<div>{this.state.content}</div>
            </div>
		);
	}
}

export default Teacher;