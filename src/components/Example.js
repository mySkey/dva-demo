import React from 'react';
import PropTypes from 'prop-types';

const Example = ({ counter }) => {
  return (
    <div>
      Example {counter}
    </div>
  );
};

Example.propTypes = {
  counter: PropTypes.number.isRequired
};

export default Example;
