import React from 'react';
import PropTypes from 'prop-types';

export const TextError = ({ children }) => {
  return <p style={{ color: '#E53E3E', fontSize: '.8rem' }}>{children}</p>;
};

TextError.propTypes = {
  children: PropTypes.node,
};
