import React, { useContext } from 'react';
import ReactSlider from 'react-slider'
import appContext from '../context/appContext';
import '../Styles/Setting.css'
import Button from './Button';

export default function Setting() {

  const {workTime, relaxTime, setWorkTime, setRelaxTime, setHideSetting} = useContext(appContext)

  return (
    <div className='sliders-container'>
      <label className='label-work'> Trabalhar : { workTime } minutos </label>
        <ReactSlider 
        className='minute-slider'
        thumbClassName='thumb'
        trackClassName='track'
        value={ workTime }
        onChange={(e) => setWorkTime(e)}
        min={1}
        max={60}
        />

      <label className='label-work'> Descançar : { relaxTime } minutos </label>
        <ReactSlider 
        className='break-slider'
        thumbClassName='thumb'
        trackClassName='track'
        value={ relaxTime }
        onChange={(e) => setRelaxTime(e)}
        min={1}
        max={60}
        />
        <Button 
        title='Voltar'
        onClick={() => setHideSetting(false)}
        className='SettingButton'
        />
    </div>
  );
}

