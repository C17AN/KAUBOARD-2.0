/*global chrome */

const useLocalStorage = (): [(key: string) => any, (key: string, value: any) => void] => {
  const getItem = (key: string) => {
    if (process.env.NODE_ENV === "development") {
      const value = localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
      return value;
    } else {
      chrome?.storage.local.get([key], (value: any) => {
        return JSON.parse(value.key);
      });
    }
  };

  const setItem = (key: string, value: any) => {
    if (process.env.NODE_ENV === "development") {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      chrome?.storage.local.set({ key: value });
    }
  };

  return [getItem, setItem];
};

export default useLocalStorage;
