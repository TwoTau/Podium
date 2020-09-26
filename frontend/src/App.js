import React from 'react';
import Header from './Header';
import Main from './Main';
import './App.css';
import socketIOClient from "socket.io-client";
import { socket_endpoint } from './config.json';

function App() {
	return (
		<div className="App">
			<Header></Header>
			<Main></Main>
		</div>
	);
}

export default App;
