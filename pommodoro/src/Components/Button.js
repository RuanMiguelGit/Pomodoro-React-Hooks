import React from 'react';
import PropTypes from 'prop-types';

function Button({ title, className, onClick }) {
  return (
    <div>
      <button
      className={className}
      onClick={onClick}
      >{title}
      </button>
    </div>
  );
}

export default Button;

Button.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};