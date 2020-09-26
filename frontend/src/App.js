import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 'Home',
			name: null
		};
	}

	onNameSet = (name) => {
		this.setState({ name });
	}

	onPageSet = (page) => {
		this.setState({ page });

		if (page === 'Home') {
			this.setState({ name: null });
		}
	}

	render() {
		return (
			<div className="App">
				<Header name={this.state.name} page={this.state.page}></Header>
				<Main onNameSet={this.onNameSet} onPageSet={this.onPageSet}></Main>
			</div>
		);
	}
}

export default App;
