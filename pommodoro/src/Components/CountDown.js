import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { tick, WorkBreak, graphy, clock } from '../Libs/lib'
import 'react-circular-progressbar/dist/styles.css';
import Button from '../Components/Button'
import PlayPauseComponent from '../Components/PlayPauseComponent'
import ResetComponent from './ResetComponent';
import {useContext, useEffect} from "react";
import appContext from '../context/appContext';
import '../Styles/CountDown.css'

function CountDown() {
  const {
  workTime,
  relaxTime,
  setHideSetting, 
  mode, 
  setMode,
  TimeLeft,
  setTimeLeft,
  PausedRef,
  TimeLeftRef,
  modeRef
  } = useContext(appContext);


  useEffect(() => {
    TimeLeftRef.current = workTime * 60;
    setTimeLeft(TimeLeftRef.current);

    const timeDealer = setInterval(() => {
      if (PausedRef.current) {
        return;
      }
      if (TimeLeftRef.current === 0) {
        return WorkBreak(modeRef, workTime, relaxTime, setMode, setTimeLeft, TimeLeftRef);
      }
      tick( TimeLeftRef, setTimeLeft);
    },1000);

    return () => clearInterval(timeDealer);
  }, [workTime]);
   
  const graph = graphy(mode, workTime, relaxTime, TimeLeft)
  const { minutos, segundos } = clock(TimeLeft)

  
  return (
    <div className='countDown'>
      <CircularProgressbar
        value={ graph }
        text={ minutos + ':' + segundos }
        styles={buildStyles({
        textColor:'black',
        pathColor:mode === 'work' ? 'red' : '#00d35f',
        tailColor:'black',
      })} />
      <div className='buttons-container'>
        <PlayPauseComponent />
      </div>
      <div className='buttons-container'> 
        <Button
        title='Configurações'
        className='Config'
        onClick={ () => setHideSetting(true) } />
      </div>
      <div className='buttons-container'>
        <ResetComponent />
      </div>
      </div>
  );
}

export default CountDown;

