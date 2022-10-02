import { useState, useEffect } from 'react';

export function useSafeSetInterval() {
  const [handler, setHandler] = useState(0);
  const safeSetInterval = (func, interval) => {
    setHandler(setInterval(func, interval));
  };

  useEffect(() => {
    return () => {
      if (handler > 0)
        clearInterval(handler);
    };
  }, [handler]);

  return safeSetInterval;
}

export function useSafeSetTimeout() {
  const [handler, setHandler] = useState(0);
  const safeSetTimeout = (func, interval) => {
    setHandler(setTimeout(func, interval));
  };

  useEffect(() => {
    return () => {
      if (handler > 0)
        clearTimeout(handler);
    };
  }, [handler]);

  return safeSetTimeout;
}

export function useSafeFetch(...args) {
  const [controller, setController] = useState(null);
  const safeFetch = (resource, options = {}) => {
    const abortController = new AbortController();
    setController(abortController);
    return fetch(resource, { ...options, signal: abortController.signal });
  };

  useEffect(() => {
    return () => controller?.abort();
  }, [controller, ...args]);

  return safeFetch;
}

export function useSafeListener() {
  const [events, setEvents] = useState([]);
  const func = (eventName, handler) => {
    if (events.every(event => event.eventName !== eventName))
      setEvents([...events, { eventName, handler }]);
  };

  useEffect(() => {
    for (let event of events) {
      window.addEventListener(event.eventName, event.handler);
    }
    return () => {
      for (let event of events) {
        window.removeEventListener(event.eventName, event.handler);
      }
    };
  }, [events]);

  return func;
}
