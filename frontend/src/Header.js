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
				<h1 className={"is-connected " + (this.props.page === 'Home' ? 'hide' : 'show') + (this.props.isConnected ? ' connected' : ' disconnected')}>{this.props.isConnected ? 'Connected' : 'Disconnected'}</h1>
				<div className={"disconnected-banner" + ((this.props.isConnected || this.props.page === 'Home') ? " hide" : "")}>
					<h1>DISCONNECTED</h1>
				</div>
			</div>
		);
	}
}

export default Header;