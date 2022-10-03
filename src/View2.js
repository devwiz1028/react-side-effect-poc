import { useState, useEffect } from 'react';
import { useSafeFetch, useSafeFetchDeps } from './SideEffect';

const View2 = () => {
  const [weather, setWeather] = useState({});
  const [index, setIndex] = useState(0);
  const safeFetch = useSafeFetch();

  useEffect(() => {
    let url = '';
    if (index === 1) {
      url = 'https://api.weather.gov/alerts/active?area=KS';
    } else if (index === 2) {
      url = 'https://api.weather.gov/alerts/active?area=CA';
    }

    if (url)
      startFetch(url);
  }, [index]);

  const startFetch = async (url) => {
    try {
      const response = await safeFetch(url);
      const newWeather = await response.json();
      setWeather(newWeather);
      console.log(newWeather);
    }
    catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div>View 2</div>
      <div>{JSON.stringify(weather)}</div>
      <button onClick={() => setIndex(1)}>Load 1</button>
      <button onClick={() => setIndex(2)}>Load 2</button>
    </div>
  );
};

export default View2;
