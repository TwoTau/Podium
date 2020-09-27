import React, { Component } from "react";
import DrawingBoard from "react-canvas-draw";

/**
 * Props:
 * - hasSubmitted: boolean
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
		this.setState({ brushRadius: this.state.brushRadius + 2 });
	}

	decreaseBrushSize = () => {
		if (this.state.brushRadius > 3) {
			this.setState({ brushRadius: this.state.brushRadius - 2 });
		}
	}

	render() {
		return (
			<div className="quiz-draw">s
				<DrawingBoard ref={drawingBoard => this.drawingBoard = drawingBoard} canvasWidth={600} canvasHeight={400} brushRadius={this.state.brushRadius}/>
				<button className="brush-size-change" disabled={this.props.hasSubmitted} onClick={this.decreaseBrushSize}>-</button>
				<button className="brush-size-change" disabled={this.props.hasSubmitted} onClick={this.increaseBrushSize}>+</button>
				<button disabled={this.props.hasSubmitted} onClick={this.undoLastMove}>Undo</button>
				<button disabled={this.props.hasSubmitted} onClick={this.clearDrawingBoard}>Clear drawing</button>
				<button className="submit-drawing" disabled={this.props.hasSubmitted} onClick={this.onSubmit}>Submit drawing</button>
			</div>
		);
	}
}

export default QuizDraw;