import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from '../Components/Button'
import {useContext, useEffect, useRef} from "react";
import appContext from '../context/appContext';
import '../Styles/CountDown.css'

function CountDown() {
  const {
  workTime,
  relaxTime,
  setHideSetting, 
  Paused,
  setPaused,
  mode, 
  setMode,
  TimeLeft,
  setTimeLeft
  } = useContext(appContext);

  const TimeLeftRef = useRef(TimeLeft);
  const PausedRef = useRef(Paused);
  const modeRef = useRef(mode);

  function tick() {
    TimeLeftRef.current--;
    setTimeLeft(TimeLeftRef.current);
  }

  function WorkBreak() {
    const newMode = modeRef.current === 'work' ? 'break' : 'work';
    const newTimerMode = (newMode === 'work' ? workTime : relaxTime) * 60;

    setMode(newMode);
    modeRef.current = newMode;

    setTimeLeft(newTimerMode);
    TimeLeftRef.current = newTimerMode;
  }

  useEffect(() => {
    TimeLeftRef.current = workTime * 60;
    setTimeLeft(TimeLeftRef.current);

    const timeDealer = setInterval(() => {
      if (PausedRef.current) {
        return;
      }
      if (TimeLeftRef.current === 0) {
        return WorkBreak();
      }

      tick();
    },1000);

    return () => clearInterval(timeDealer);
  }, [workTime]);

  const total = mode === 'work'
    ? workTime * 60
    : relaxTime * 60;
  const graph = Math.round(TimeLeft / total * 100);

  const minutos = Math.floor(TimeLeft / 60);
  let segundos = TimeLeft % 60;
  if(segundos < 10) segundos = '0'+segundos;

  return (
    <div className='countDown'>
      <CircularProgressbar
        value={graph}
        text={minutos + ':' + segundos}
        styles={buildStyles({
        textColor:'black',
        pathColor:mode === 'work' ? 'red' : '#00d35f',
        tailColor:'black',
      })} />
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
      <div className='buttons-container'>
        <Button
        title='Configurações'
        className='Config'
        onClick={() => setHideSetting(true)} />
      </div>
      { 
      modeRef.current === 'work' ?
      <Button
        title='Zerar'
        className='Zerar'
        onClick={() => TimeLeftRef.current = 25 * 60} />
      :
      <Button
        title='Zerar Descanco'
        className='Zerar'
        onClick={() => TimeLeftRef.current = 5 * 60} />
      } 
      </div>
  );
}

export default CountDown;

