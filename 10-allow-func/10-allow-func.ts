function allowFunc(validator: (val: any) => boolean) {
  return function (
    target: any,
    context: ClassAccessorDecoratorContext
  ) {
    let value: any;
    return {
      get() { return value; },
      set(newVal: any) { if (validator(newVal)) value = newVal; }
    };
  };
}

class User {
  @allowFunc((a: number) => a > 0)
  accessor age: number = 30;
}

const person = new User();
console.log(person.age); // 30

person.age = 0;
console.log(person.age); // 30

person.age = 20;
console.log(person.age); // 20
