export const saveInLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string) => JSON.parse(localStorage.getItem(key) || '');
