type Difference<T, U> = {
  [K in Exclude<keyof T, keyof U>]: T[K]
};

function difference<
  T extends Record<string, any>,
  U extends Record<string, any>
>(obj1: T, obj2: U): Difference<T, U> {
  const result = {} as Difference<T, U>;
  for (const key of Object.keys(obj1)) {
    if (!(key in obj2) && (Object.keys(obj1) as Array<string>).includes(key)) {
      (result as any)[key] = obj1[key as keyof T];
    }
  }
  return result;
}

interface IA {
  a: number;
  b: string;
}

interface IB {
  a: number;
  c: boolean;
}

let a: IA = { a: 5, b: '' };
let b: IB = { a: 10, c: true };

const v0 = difference(a, b); // v0: { b: string }
