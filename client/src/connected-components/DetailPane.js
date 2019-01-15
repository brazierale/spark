import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TagList } from '../components/TagList';

// right-hand pane displaying details of selected test case
class DetailPane extends Component {

    render() {
        if (this.props.selectedTestCase){
            return (
                <div className="Detail-pane">
                    <div className="Detail-pane-header">
                        <h1>{this.props.selectedTestCase.summary}</h1>
                    </div>
                    <TagList tags={['one', 'two', 'three']}/>
                    <div className="Row-id">{this.props.selectedTestCase.id}</div>
                </div>
            )            
        }
        else {
            return null
        }
    }
}

const mapStateToProps = state => {    
    return {
        selectedTestCase: state.selectedTestCase,
    }
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPane);