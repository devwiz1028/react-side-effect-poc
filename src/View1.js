import { useEffect, useState } from 'react';
import { useSafeSetInterval, useSafeSetTimeout } from './SideEffect';

let gCounter = 1;

const View1 = () => {
  const [counter, setCounter] = useState(1);
  const safeSetInterval = useSafeSetInterval();
  const safeSetTimeout = useSafeSetTimeout();

  useEffect(() => {
    startTimer1();
  }, []);

  const startTimer1 = () => {
    safeSetInterval(() => {
      console.log('View 1 - ', gCounter);
      setCounter(++gCounter);
    }, 1000);
  };

  const startTimer2 = () => {
    safeSetTimeout(() => {
      gCounter += 10;
      console.log('View 1 - ', gCounter);
      setCounter(gCounter);
    }, 5000);
  };

  return (
    <div>
      <div>View 1</div>
      <div>{counter}</div>
    </div>
  );
};

export default View1;
