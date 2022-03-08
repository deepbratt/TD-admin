function dateCreator() {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let arr = [];
  for (let i = 1960; i <= currentYear; i++) {
    arr.push(i.toString());
  }
  return arr;
}

const onlyYears = dateCreator();

export default onlyYears;

export const extractError = (response: any) => {
  return {
    status: 'Error',
    message: response.response.data.message
  };
};

export function setWithExpiry(key: any, value: any, ttl: any) {
  const item = {
    value: value,
    expiry: new Date().getTime() + ttl
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getWithExpiry(key: any) {
  const itemString = window.localStorage.getItem(key);
  if (!itemString) return null;

  const item = JSON.parse(itemString);
  const isExpired = new Date().getTime() > item.expiry;

  if (isExpired) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}

export const getKeyValue =
  <T extends object, U extends keyof T>(obj: T) =>
  (key: U) =>
    obj[key];
