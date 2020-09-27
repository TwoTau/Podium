import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

class Home extends Component {
	constructor(props) {
		super(props);
		this.props.onPageSet('Home');
		this.props.setConnectionStatus(false);
	}

	render() {
		return (
			<div className="home">
				<Link to="/teacher" className="home-button">Teacher page</Link>
				<Link to="/student" className="home-button">Student page</Link>
			</div>
		);
	}
}

export default Home;