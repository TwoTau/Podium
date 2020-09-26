import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Header.css';

class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="header">
				<h1><Link to="/">Pollodium</Link> | {this.props.page}</h1>
				<h1 className="username">{this.props.name || '(Not signed in)'}</h1>
			</div>
		);
	}
}

export default Header;