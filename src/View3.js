import { useState } from 'react';
import { useSafeListener } from './SideEffect';

const View3 = () => {
  const [size, setSize] = useState(1);
  const safeListener = useSafeListener();

  safeListener('resize', (event) => {
    console.log(event);
  });

  safeListener('click', (event) => {
    console.log(event);
  });

  return (
    <div>
      <div>View 3</div>
      {/* <div>{counter}</div> */}
    </div>
  );
};

export default View3;
