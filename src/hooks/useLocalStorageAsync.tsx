/*global chrome */

import isEmpty from "../utils/helpers/isEmpty";

const useLocalStorageAsync = (): [
  (key: string) => Promise<any>,
  (key: string, value: any) => Promise<void>
] => {
  const getItem = async (key: string): Promise<any> => {
    if (process.env.NODE_ENV === "development") {
      const value = localStorage.getItem(key);
      if (value) {
        return new Promise((resolve, reject) => {
          resolve(JSON.parse(value));
        });
      }
    } else {
      return new Promise((resolve, reject) =>
        chrome?.storage.local.get([key], (value: any) => {
          const result = value[key];
          isEmpty(result) ? resolve(null) : resolve(result);
        })
      );
    }
  };

  const setItem = async (key: string, value: any): Promise<void> => {
    if (process.env.NODE_ENV === "development") {
      return new Promise((resolve, reject) => {
        localStorage.setItem(key, JSON.stringify(value));
        resolve();
      });
    } else {
      return new Promise((resolve, reject) => {
        chrome?.storage.local.set({ [key]: value });
        resolve();
      });
    }
  };

  return [getItem, setItem];
};

export default useLocalStorageAsync;
