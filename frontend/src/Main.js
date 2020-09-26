import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Student from './student/Student';
import Teacher from './teacher/Teacher';

class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Switch> {/* The Switch decides which component to show based on the current URL.*/}
				<Route exact path='/' render={(props) => (
					<Home {...this.props} {...props} />
				)}></Route>
				<Route exact path='/teacher' render={(props) => (
					<Teacher {...this.props} {...props} />
				)}></Route>
				<Route exact path='/student' render={(props) => (
					<Student {...this.props} {...props} />
				)}></Route>
			</Switch>
		);
	}
}

export default Main;