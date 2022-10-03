import { useState, useEffect, useRef } from 'react';

export function useSafeSetInterval() {
  const handlers = useRef([]);
  const safeSetInterval = (func, interval) => {
    handlers.current = [...handlers.current, (setInterval(func, interval))];
  };

  useEffect(() => {
    return () => handlers.current.forEach(clearInterval);
  }, []);

  return safeSetInterval;
}

export function useSafeSetTimeout() {
  const handlers = useRef([]);
  const safeSetTimeout = (func, interval) => {
    handlers.current = [...handlers.current, (setTimeout(func, interval))];
  };

  useEffect(() => {
    return () => handlers.current.forEach(clearTimeout);
  }, []);

  return safeSetTimeout;
}

export function useSafeFetch() {
  const controllers = useRef([]);
  const safeFetch = (resource, options = {}) => {
    const abortController = new AbortController();
    controllers.current = [...controllers.current, abortController];
    return fetch(resource, { ...options, signal: abortController.signal });
  };

  useEffect(() => {
    return () => controllers.current.forEach(controller => controller.abort());
  }, []);

  return safeFetch;
}

export function useSafeFetchDeps(...args) {
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
  const events = useRef([]);
  const func = (eventName, handler) => {
    if (events.current.every(event => event.eventName !== eventName))
      window.addEventListener(eventName, handler);
      events.current = [...events.current, { eventName, handler }];
  };

  useEffect(() => {
    return () => {
      for (let event of events.current) {
        window.removeEventListener(event.eventName, event.handler);
      }
    };
  }, []);

  return func;
}
