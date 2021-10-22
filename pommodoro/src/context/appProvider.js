/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './appContext';

function Provider({ children }) {
  const [workTime, setWorkTime] = useState(15)
  const [relaxTime, setRelaxTime ] = useState(5)
  const [hideSetting, setHideSetting] = useState(true)

  const contextValue = {
   workTime,
   relaxTime,
   setWorkTime,
   setRelaxTime,
   hideSetting,
   setHideSetting
  };

  return (
    <appContext.Provider value={ contextValue }>
      {children}
    </appContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};
