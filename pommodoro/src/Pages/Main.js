import React, { useContext } from 'react';
import CountDown from '../Components/CountDown';
import Setting from '../Components/Setting';
import appContext from '../context/appContext';

function Main() {
  const { hideSetting } = useContext(appContext)

  return (
    <div>
      { !hideSetting ?
      <CountDown /> :
      <Setting />
      }
      </div>
  );
}

export default Main;
