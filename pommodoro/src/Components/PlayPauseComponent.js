import React, { useContext } from 'react';
import appContext from '../context/appContext';
import Button from '../Components/Button'

export default function PlayPauseComponent() {
    const { Paused, setPaused, PausedRef } = useContext(appContext);
  return (
    <div>
      <div className='buttons-container'>
        {Paused
          ? <Button 
          title='Começar'
          className='BtnStart'
          onClick={() => { setPaused(false); PausedRef.current = false; }} />
          : <Button 
          className='BtnPause'
            title='Parar'
          onClick={() => { setPaused(true); PausedRef.current = true; }} />}
      </div>
    </div>
  );
}
