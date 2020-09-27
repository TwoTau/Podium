import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import './App.css';
import QuizQuestion from './student/QuizQuestion';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 'Home',
			name: null,
			isConnected: false,
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
		if (!this.state.isConnected) {
			newTitle += ' ❌';
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
		this.setState({ page }, this.updateTitle);

		if (page === 'Home') {
			this.setState({ name: null });
		}
	}

	setConnectionStatus = (isConnected) => {
		this.setState({
			isConnected,
		}, this.updateTitle);
		console.log(`isConnected = ${isConnected}`);
  }

	render() {
		return (
			<div className="App">
				<Header name={this.state.name} page={this.state.page} isConnected={this.state.isConnected}></Header>
				<Main onNameSet={this.onNameSet} onPageSet={this.onPageSet} setConnectionStatus={this.setConnectionStatus}></Main>
			</div>
		);
	}
}

export default App;
