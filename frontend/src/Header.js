import React, { Component } from "react";
import './Header.css';

class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="header">
				<h1>Pollodium | {this.props.page}</h1>
				<h1 className="username">{this.props.name || '(Not signed in)'}</h1>
			</div>
		);
	}
}

export default Header;