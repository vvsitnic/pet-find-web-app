import { useEffect, useRef, useState } from 'react';

type Timer = ReturnType<typeof setTimeout>;
type Func = (...args: any[]) => void;

export const useDebounce = (fn: Func, timespan: number) => {
  const timer = useRef<Timer>();

  useEffect(() => {
    return () => {
      if (!timer.current) {
        return;
      } else {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => {
      fn(...args);
    }, timespan);

    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = newTimer;
  }) as Func;

  return debouncedFunction;
};

export function useCoords() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const getCoords = async () => {
      try {
        setIsLoading(true);
        const coords = await getPosition();
        setCoords(coords);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getCoords();
  }, []);

  return { coords, isLoading, isError };
}

function getPosition() {
  return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        resolve(coords);
      },
      err => {
        reject('Unable to retrieve your position!');
      }
    );
  });
}
