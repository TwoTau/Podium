import React, { Component } from "react";
import DrawingBoard from "react-canvas-draw";

/**
 * Props:
 * - onSubmit: function
 */
class QuizDraw extends Component {
	constructor(props) {
		super(props);
	}

	onSubmit = (event) => {
		this.props.onSubmit(this.drawingBoard.getSaveData());
	}

	clearDrawingBoard = () => {
		this.drawingBoard.clear();
	}

	undoLastMove = () => {
		this.drawingBoard.undo();
	}

	render() {
		return (
			<div className="quiz-short-answer">
				<DrawingBoard ref={drawingBoard => this.drawingBoard = drawingBoard} canvasWidth={600} canvasHeight={600}/>
				<button onClick={this.undoLastMove}>Undo</button>
				<button onClick={this.clearDrawingBoard}>Clear drawing</button>
				<button onClick={this.onSubmit}>Submit drawing</button>
			</div>
		);
	}
}

export default QuizDraw;