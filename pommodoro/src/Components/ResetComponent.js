import React, { useContext } from 'react';
import Button from '../Components/Button'
import appContext from '../context/appContext';

export default function ResetComponent() {
    const { modeRef, TimeLeftRef } = useContext(appContext);
  return (
    <div>
        { 
      modeRef.current === 'work' ?
      <Button
        title='Zerar'
        className='Zerar'
        onClick={ () => TimeLeftRef.current = 25 * 60 } />
      :
      <Button
        title='Zerar Descanco'
        className='Zerar'
        onClick={ () => TimeLeftRef.current = 5 * 60 } />
      } 
    </div>
  );
}

