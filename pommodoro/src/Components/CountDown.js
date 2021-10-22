import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from '../Components/Button'
import {useContext, useState, useEffect, useRef} from "react";
import appContext from '../context/appContext';
import '../Styles/CountDown.css'

function CountDown() {
  const {
    workTime,
    relaxTime,
    setHideSetting, 
  } = useContext(appContext);

  const [Paused, setPaused] = useState(true);
  const [mode, setMode] = useState('work')
  const [TimeLeft, setTimeLeft] = useState(0);

  const TimeLeftRef = useRef(TimeLeft);
  const PausedRef = useRef(Paused);
  const modeRef = useRef(mode);

  function tick() {
    TimeLeftRef.current--;
    setTimeLeft(TimeLeftRef.current);
  }

  function WorkBreak() {
    const nextMode = modeRef.current === 'work' ? 'break' : 'work';
    const nextSeconds = (nextMode === 'work' ? workTime : relaxTime) * 60;

    setMode(nextMode);
    modeRef.current = nextMode;

    setTimeLeft(nextSeconds);
    TimeLeftRef.current = nextSeconds;
  }

  useEffect(() => {

    WorkBreak()

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
    <div style={{ width: 500, height: 500, marginLeft:550}}>
      <CircularProgressbar
        value={graph}
        text={minutos + ':' + segundos}
        styles={buildStyles({
        textColor:'black',
        pathColor:mode === 'work' ? '#00d35f' : 'red',
        tailColor:'black',
      })} />
      <div style={{marginTop:'20px'}}>
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
      <div style={{marginTop:'20px'}}>
        <Button
        title='Configurações'
        className='Config'
        onClick={() => setHideSetting(true)} />
      </div>
      <Button
        title='Zerar'
        className='Zerar'
        onClick={() => setTimeLeft(25 * 60)} />
    </div>
  );
}

export default CountDown;

