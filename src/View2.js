import { useState, useEffect } from 'react';
import { useSafeFetch } from './SideEffect';

const View2 = () => {
  const [list, setList] = useState([]);
  const [index, setIndex] = useState(0);
  const safeFetch = useSafeFetch(index);

  useEffect(() => {
    let url = '';
    if (index === 1) {
      url = 'https://goweather.herokuapp.com/weather/Curitiba';
    } else if (index === 2) {
      url = 'https://goweather.herokuapp.com/weather/Brazil';
    }

    if (url)
      startFetch(url);
  }, [index]);

  const startFetch = async (url) => {
    try {
      const response = await safeFetch(url);
      const newList = await response.json();
      setList(newList);
      console.log(newList);
    }
    catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div>View 2</div>
      <div>{JSON.stringify(list)}</div>
      <button onClick={() => setIndex(1)}>Load 1</button>
      <button onClick={() => setIndex(2)}>Load 2</button>
    </div>
  );
};

export default View2;
