import React, { Component } from 'react';

export class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowId: props.rowId,
        };

        this.handleUp = this.handleUp.bind(this);
        this.handleDown = this.handleDown.bind(this);
    }

    render() {
        return (
            <div className="Row" rowId={this.props.rowId}>
                <div className="Row-id">
                    {this.state.rowId}
                </div>
                <div className="Arrows">
                    <div />
                    <span className="Up arrow" onClick={this.handleUp} />
                    <span className="Down arrow" onClick={this.handleDown} />
                    <div />
                </div>
                <div className="Test-case">{this.props.children}</div>
            </div>
        )
    }

    handleUp(e) {
        let newId = this.state.rowId;
        if (newId > 0) {
            newId++;
        }
        this.setState({rowId: newId})
    }

    handleDown(e) {
        let newId = this.state.rowId;
        
        newId--;

        this.setState({rowId: newId})
    }
}

