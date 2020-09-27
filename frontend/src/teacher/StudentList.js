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
            <div className="information-text">
                <h1>StudentList</h1>
                <ul>
                    {this.props.students.sort((a, b) => {
                        return b.score - a.score;
                    }).map((student) =>
                        <li key={student.username}>{student.username} ({student.score})</li>
                    )}
                </ul>
            </div>
        );
    }
}

export default StudentList;