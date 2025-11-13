interface MyObject {
  id: number;
  date: string;
  title: string;
}

class MyObjectIterator implements Iterable<MyObject> {
  private sorted: MyObject[];

  constructor(
    array: MyObject[],
    by: 'id' | 'date' = 'id',
    ascending: boolean = true
  ) {
    this.sorted = [...array].sort((a, b) => {
      let comparison = 0;
      if (by === 'id') {
        comparison = a.id - b.id;
      } else {
        const parseDate = (dateStr: string) => {
          const [d, m, y] = dateStr.split('-').map(Number);
          return new Date(y, m - 1, d).getTime();
        };
        comparison = parseDate(a.date) - parseDate(b.date);
      }
      return ascending ? comparison : -comparison;
    });
  }

  *[Symbol.iterator](): Iterator<MyObject> {
    for (const item of this.sorted) {
      yield item;
    }
  }
}

// Пример использования:
const data: MyObject[] = [
  { id: 2, date: "01-02-2023", title: "Второй" },
  { id: 1, date: "01-01-2023", title: "Первый" },
  { id: 3, date: "01-01-2024", title: "Третий" },
];

const iteratorById = new MyObjectIterator(data, 'id');
for (const item of iteratorById) {
  console.log(item);
}

const iteratorByDateDesc = new MyObjectIterator(data, 'date', false);
for (const item of iteratorByDateDesc) {
  console.log(item);
}
