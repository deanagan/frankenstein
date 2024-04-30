import { useEffect, useState } from "react";

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(
    () => (window.localStorage.getItem(key) as T) || defaultValue
  );

  useEffect(() => {
    window.localStorage.setItem(key, value as string);
  }, [key, value]);

  return [value, setValue];
}
