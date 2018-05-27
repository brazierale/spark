import React, { Component } from 'react';

export class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowId: props.id,
        };

        this.handleUp = this.handleUp.bind(this);
        this.handleDown = this.handleDown.bind(this);
    }

    render() {
        return (
            <div className="Row" rowid={this.props.rowid}>
                <div className="Test-case-container">{this.props.children}</div>
                <div className="Arrows">
                    <div />
                    <span className="Up arrow" onClick={this.handleUp} />
                    <span className="Down arrow" onClick={this.handleDown} />
                    <div />
                </div>
                <div className="Row-id">
                    {this.state.rowId}
                </div>
            </div>
        )
    }

    handleUp(e) {
        console.log('move row up');
    }

    handleDown(e) {
        console.log('move row down');
    }
}

