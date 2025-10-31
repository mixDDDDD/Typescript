function pickObjectKeys<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

const user = {
  name: "Vasiliy",
  age: 8,
  skills: ['typescript', 'javascript']
}

const res1 = pickObjectKeys(user, ['age', 'skills']);
console.log(res1);
/*
{
  age: 8,
  skills: ['typescript', 'javascript']
}
*/
