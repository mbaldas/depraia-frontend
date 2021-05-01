import { useState } from "react";

export function useLocalStorage(key: any, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      var jsonAux = JSON.stringify(value);
      setStoredValue(jsonAux);
      window.localStorage.setItem(key, jsonAux);
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
