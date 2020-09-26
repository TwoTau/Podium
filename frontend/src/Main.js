import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Student from './student/Student';
import Teacher from './teacher/Teacher';

const Main = () => {
	return (
		<Switch> {/* The Switch decides which component to show based on the current URL.*/}
			<Route exact path='/' component={Home}></Route>
			<Route exact path='/student' component={Student}></Route>
			<Route exact path='/teacher' component={Teacher}></Route>
		</Switch>
	);
}

export default Main;