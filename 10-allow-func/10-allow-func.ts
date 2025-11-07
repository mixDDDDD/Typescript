function allowFunc<T>(validator: (value: T) => boolean, defaultValue: T) {
  return function (target: any, context: ClassAccessorDecoratorContext) {
    let value: T;
    return {
      get() { return value; },
      set(newVal: T) {
        if (validator(newVal)) value = newVal;
      },
      init(initialValue: T) {
        if (!validator(initialValue)) {
          value = defaultValue;
        } else {
          value = initialValue;
        }
        return value;
      }
    };
  };
}

class User {
  @allowFunc<number>(a => a > 0, 1)
  accessor age: number = 30;
}

const person = new User();
console.log(person.age); // 30

person.age = 0;
console.log(person.age); // 30

person.age = 20;
console.log(person.age); // 20
