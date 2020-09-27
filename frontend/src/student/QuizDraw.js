import React, { Component } from "react";
import DrawingBoard from "react-canvas-draw";

/**
 * Props:
 * - onSubmit: function
 */
class QuizDraw extends Component {
	constructor(props) {
		super(props);

		this.state = {
			brushRadius: 12,
		}
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

	increaseBrushSize = () => {
		this.setState({brushRadius: this.state.brushRadius + 2});
	}

	decreaseBrushSize = () => {
		if (this.state.brushRadius > 3) {
			this.setState({brushRadius: this.state.brushRadius - 2});
		}
	}

	render() {
		return (
			<div className="quiz-short-answer">
				<DrawingBoard ref={drawingBoard => this.drawingBoard = drawingBoard} canvasWidth={400} canvasHeight={400} brushRadius={this.state.brushRadius}/>
				<button onClick={this.increaseBrushSize}>+</button>
				<button onClick={this.decreaseBrushSize}>-</button>
				<button onClick={this.undoLastMove}>Undo</button>
				<button onClick={this.clearDrawingBoard}>Clear drawing</button>
				<button onClick={this.onSubmit}>Submit drawing</button>
			</div>
		);
	}
}

export default QuizDraw;