import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Button = (props) => (
  <button
    type="submit"
    onClick={() => props.onClick()}
    className={styles.btn}
  >
    {props.label}
  </button>
);

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  label: '',
  onClick: () => { }
};

export default Button;
