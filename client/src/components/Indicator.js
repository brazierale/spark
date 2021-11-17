import React from 'react';
import PropTypes from 'prop-types';

// indicator to show API calls are outstanding
const Indicator = props => {
    if (props.loading) {
        return <div data-testid='loading' className="Loading"/>
    }
    else if (props.saving) {
        return <div data-testid='saving' className="Saving"/>
    }
    else {
        return null;
    }
}

Indicator.propTypes = {
    loading: PropTypes.bool.isRequired,
    saving: PropTypes.bool.isRequired
}

export default Indicator;
