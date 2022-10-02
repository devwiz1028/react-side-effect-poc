import { useState } from 'react';

import View1 from './View1';
import View2 from './View2';
import View3 from './View3';

function App() {
  const [index, setIndex] = useState(1);

  return (
    <div className="App">
      <div>
        <button onClick={() => setIndex(1)}>View 1</button>
        <button onClick={() => setIndex(2)}>View 2</button>
        <button onClick={() => setIndex(3)}>View 3</button>
      </div>
      {index === 1 && <View1 />}
      {index === 2 && <View2 />}
      {index === 3 && <View3 />}
    </div>
  );
}

export default App;
