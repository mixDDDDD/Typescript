class RequestBuilder {
  private method: string = 'GET';
  private url: string = '';
  private headers: Record<string, string> = {};
  private body: any = undefined;

  setMethod(method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
    this.method = method;
    return this;
  }

  setUrl(url: string) {
    this.url = url;
    return this;
  }

  addHeader(key: string, value: string) {
    this.headers[key] = value;
    return this;
  }

  setBody(body: any) {
    this.body = body;
    return this;
  }

  build(): RequestInit & { url: string } {
    return {
      url: this.url,
      method: this.method,
      headers: this.headers,
      body: this.method !== 'GET' ? JSON.stringify(this.body) : undefined,
    };
  }
}

class Api {
  async fetchWithBuilder(request: RequestInit & { url: string }): Promise<any> {
    const { url, ...options } = request;
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error fetching ${url}: ${response.statusText}`);
    }
    return response.json();
  }
}

class ProductProxy {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getProduct(id: number): Promise<any> {
    if (!Number.isInteger(id) || id < 1) {
      throw new Error('Product ID must be a positive integer');
    }
    if (id >= 10) {
      throw new Error(`Request blocked: Product ID ${id} is out of allowed range`);
    }

    const request = new RequestBuilder()
      .setMethod('GET')
      .setUrl(`https://dummyjson.com/products/${id}`)
      .build();

    return this.api.fetchWithBuilder(request);
  }
}

// Пример использования
(async () => {
  const api = new Api();
  const proxy = new ProductProxy(api);

  try {
    const product = await proxy.getProduct(5);
    console.log('Product:', product);
  } catch (error) {
    console.error(error);
  }
})();
