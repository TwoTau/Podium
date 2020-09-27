import React, { Component } from "react";

/**
 * Props:
 * - name: string
 * - score: number
 * - rank: number
 */
class Participant extends Component {
    constructor(props) {
        super(props);
    }

    getStyle = () => {
        switch (this.props.rank) {
            case 1:
                return {
                    color: '#C9B037',
                    fontSize: '32px'
                }
            case 2:
                return {
                    color: '#8d8d8d',
                    fontSize: '28px'
                }
            case 3:
                return {
                    color: '#AD8A56',
                    fontSize: '24px'
                }
            default:
                return {
                    color: '#acacac',
                    fontSize: '18px'
                }
        }
    }

    render() {
        return (
            <div className={"participant"}>
                <div className={"participant-name"}>
                    <h3 style={this.getStyle()}>
                        {this.props.rank + ". " + this.props.name}
                    </h3>
                </div>
                <div className={"participant-score"}>
                    <h3 style={this.getStyle()}>
                        {this.props.score}
                    </h3>
                </div>
            </div>
        );
    }
}

export default Participant;