import React from 'react';

type IndicatorProps = {
  loading: boolean;
  saving: boolean;
}

// indicator to show API calls are outstanding
const Indicator = ({ loading, saving }: IndicatorProps) => {
  if (loading) {
    return <div data-testid='loading' className="Loading"/>;
  }
  else if (saving) {
    return <div data-testid='saving' className="Saving"/>;
  }
  else {
    return null;
  }
};

export default Indicator;
