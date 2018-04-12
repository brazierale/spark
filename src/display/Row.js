import React, { Component } from 'react';

export class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowId: props.rowid,
        };

        this.handleUp = this.handleUp.bind(this);
        this.handleDown = this.handleDown.bind(this);
    }

    render() {
        return (
            <div className="Row" rowid={this.props.rowId}>
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
        this.props.swapRows(this.props.rowid, 'up');
    }

    handleDown(e) {
        this.props.swapRows(this.props.rowid, 'down');
    }
}

