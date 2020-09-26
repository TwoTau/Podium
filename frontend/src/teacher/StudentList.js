import React, { Component } from 'react';

class StudentList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>StudentList</h1>
                <ul>
                    {this.props.students.map((student) =>
                        <li key={student.username}>{student.username} ({student.score})</li>
                    )}
                </ul>
            </div>
        );
    }
}

export default StudentList;