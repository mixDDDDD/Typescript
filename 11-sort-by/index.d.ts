// Тип определения для пакета sort-by

declare module 'sort-by' {
  /**
   * Возвращает функцию сравнения для массива объектов с возможностью сортировки по нескольким полям.
   *
   * @param {...string} properties - Имена свойств объекта для сортировки, без или с префиксом "-" для обратного порядка.
   * @returns {(a: any, b: any) => number} Функция сравнения для Array.prototype.sort.
   */
  function sortBy(...properties: string[]): (a: any, b: any) => number;

  export = sortBy;
}
