import { useEffect, useState } from 'react';
import { useSafeSetInterval, useSafeSetTimeout } from './SideEffect';

let gCounter = 1;

const View1 = () => {
  const [counter, setCounter] = useState(1);
  const safeSetInterval = useSafeSetInterval();
  const safeSetTimeout = useSafeSetTimeout();

  useEffect(() => {
    startTimer2();
  }, []);

  const startTimer1 = () => {
    safeSetInterval(() => {
      console.log('View 1 - ', gCounter);
      setCounter(++gCounter);
    }, 1000);
    safeSetInterval(() => {
      console.log('View 1 - ', gCounter);
      setCounter(++gCounter);
    }, 2000);
  };

  const startTimer2 = () => {
    safeSetTimeout(() => {
      gCounter += 10;
      console.log('View 1 - ', gCounter);
      setCounter(gCounter);
    }, 5000);
    safeSetTimeout(() => {
      gCounter += 20;
      console.log('View 1 - ', gCounter);
      setCounter(gCounter);
    }, 8000);
  };

  return (
    <div>
      <div>View 1</div>
      <div>{counter}</div>
    </div>
  );
};

export default View1;
