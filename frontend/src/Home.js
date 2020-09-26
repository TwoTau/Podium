import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
	render() {
		return (
			<div className="home">
				<h1>Home component</h1>
				<Link to="/teacher">
					<button>Teacher page</button>
				</Link>
				<br />
				<Link to="/student">
					<button>Student page</button>
				</Link>
			</div>
		);
	}
}

export default Home;