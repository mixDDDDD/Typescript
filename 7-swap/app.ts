function swapKeysAndValues<T extends Record<string | number, string | number>>(obj: T): Record<T[keyof T], keyof T> {
  const result = {} as Record<T[keyof T], keyof T>;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      result[value] = key;
    }
  }
  return result;
}

const obj: Record<string, number> = {
  a: 1,
  b: 2
};

const res = swapKeysAndValues(obj);
console.log(res);
