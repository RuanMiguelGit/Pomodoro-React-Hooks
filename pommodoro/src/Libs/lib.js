export const tick = (TimeRef, setter) => {
  TimeRef.current--;
  setter(TimeRef.current);
}

export const WorkBreak = (modeRef, timeWork, timeRelax, setMode, setterTime, timeRef) => {
  const newMode = modeRef.current === 'work' ? 'break' : 'work';
  const newTimerMode = (newMode === 'work' ? timeWork : timeRelax) * 60;

  setMode(newMode);
  modeRef.current = newMode;

  setterTime(newTimerMode);
  timeRef.current = newTimerMode;
}

export const graphy = (mode, workTime, relaxTime, TimeLeft) => {
  const total = mode === 'work'
  ? workTime * 60
  : relaxTime * 60;
const graph = Math.round(TimeLeft / total * 100);
return graph
}

export const clock = (TimeLeft) => {
  const minutos = Math.floor(TimeLeft / 60);
  let segundos = TimeLeft % 60;
      if(segundos < 10) segundos = '0'+segundos;
return {minutos, segundos}
}