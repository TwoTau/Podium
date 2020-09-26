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

	updateTitle = () => {
		let newTitle = 'Pollodium | ';
		if (this.state.page === 'student') {
			newTitle += this.state.name;
		} else {
			const uppercase = this.state.page[0].toUpperCase() + this.state.page.slice(1);
			newTitle += uppercase;
		}
		document.getElementsByTagName('title')[0].text = newTitle;
	}

	onNameSet = (name) => {
		this.setState({ name }, () => {
			if (this.state.page === 'student') {
				this.updateTitle();
			}
		});
	}

	onPageSet = (page) => {
		this.setState({ page }, () => {
			this.updateTitle();
		});

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
