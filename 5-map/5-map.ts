type BucketNode<K, V> = {
  key: K;
  value: V;
  next: BucketNode<K, V> | null;
};

class MyMap<K extends string | number, V> {
  private buckets: Array<BucketNode<K, V> | null>;
  private capacity: number;

  constructor(capacity = 16) {
    this.capacity = capacity;
    this.buckets = new Array(capacity).fill(null);
  }

  private hash(key: K): number {
    // Простая хэш-функция для строки/числа
    let str = key.toString();
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
    }
    return hash % this.capacity;
  }

  set(key: K, value: V): void {
    const index = this.hash(key);
    let node = this.buckets[index];

    // Если бакет пуст, создаём новый узел
    if (!node) {
      this.buckets[index] = { key, value, next: null };
      return;
    }

    // Идём по цепочке, проверяя ключ
    let prev: BucketNode<K, V> | null = null;
    while (node) {
      if (node.key === key) {
        node.value = value; // Обновляем, если ключ найден
        return;
      }
      prev = node;
      node = node.next;
    }

    // Добавляем новый узел в конец цепочки
    if (prev) {
      prev.next = { key, value, next: null };
    }
  }

  get(key: K): V | undefined {
    const index = this.hash(key);
    let node = this.buckets[index];
    while (node) {
      if (node.key === key) return node.value;
      node = node.next;
    }
    return undefined;
  }

  delete(key: K): boolean {
    const index = this.hash(key);
    let node = this.buckets[index];
    let prev: BucketNode<K, V> | null = null;

    while (node) {
      if (node.key === key) {
        if (prev) {
          prev.next = node.next;
        } else {
          this.buckets[index] = node.next;
        }
        return true;
      }
      prev = node;
      node = node.next;
    }
    return false;
  }

  clear(): void {
    this.buckets = new Array(this.capacity).fill(null);
  }
}

// Пример использования
const weatherMap = new Map<string, number>();

weatherMap.set('London', 20);
weatherMap.set('Berlin', 25);
console.log(weatherMap.get('London')); // 20

weatherMap.delete('London');
console.log(weatherMap.get('London')); // undefined

weatherMap.clear();
console.log(weatherMap.get('Berlin')); // undefined
