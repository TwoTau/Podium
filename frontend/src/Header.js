import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Header.css';

class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let title = ` | ${this.props.page}`;
		if (this.props.name) {
			title = ` | ${this.props.name}`;
		}
		return (
			<div className="header">
				<h1 className="title"><Link to="/">Pollodium</Link> <span>{title}</span></h1>
				<h1 className={"is-connected " + (this.props.page === 'Home' ? 'hide' : 'show') + (this.props.isConnected ? ' connected' : ' disconnected')}>{this.props.isConnected ? 'Connected' : 'Disconnected'}</h1>
				<div className={"disconnected-banner" + ((this.props.isConnected || this.props.page === 'Home') ? " hide" : "")}>
					<h1>DISCONNECTED</h1>
				</div>
			</div>
		);
	}
}

export default Header;