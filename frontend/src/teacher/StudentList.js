import React, { Component } from 'react';

class StudentList extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState){
        return true;
    }

    render() {
        console.log(this.props.students)
        return (
            <div className="information-text student-list">
                {this.props.students.sort((a, b) => {
                    return b.score - a.score;
                }).map((student) =>
                    <div key={student.username}><span className="username">{student.username}</span><span className="score">{student.score}</span></div>
                )}
            </div>
        );
    }
}

export default StudentList;