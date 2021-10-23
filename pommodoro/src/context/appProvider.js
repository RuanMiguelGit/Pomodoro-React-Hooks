/* eslint-disable */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import appContext from './appContext';

function Provider({ children }) {
  const [workTime, setWorkTime] = useState(25)
  const [relaxTime, setRelaxTime ] = useState(5)
  const [hideSetting, setHideSetting] = useState(false)
  const [Paused, setPaused] = useState(true);
  const [mode, setMode] = useState('work')
  const [TimeLeft, setTimeLeft] = useState(0);
  const PausedRef = useRef(Paused);
  const TimeLeftRef = useRef(TimeLeft);
  const modeRef = useRef(mode);

  const contextValue = {
   workTime,
   relaxTime,
   setWorkTime,
   setRelaxTime,
   hideSetting,
   setHideSetting,
   Paused,
   setPaused,
   mode, 
   setMode,
   TimeLeft,
   setTimeLeft,
   PausedRef,
   TimeLeftRef,
   modeRef
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
