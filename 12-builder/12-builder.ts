class RequestBuilder {
  private method: string = 'GET';
  private url: string = '';
  private headers: Record<string, string> = {};
  private body: any = undefined;

  type(method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
    this.method = method.toUpperCase();
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

  async exec(): Promise<Response> {
    if (this.body && !this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/json';
    }

    const options: RequestInit = {
      method: this.method,
      headers: this.headers,
      body: this.method !== 'GET' ? (typeof this.body === 'string' ? this.body : JSON.stringify(this.body)) : undefined,
    };

    if (!this.url) {
      throw new Error('URL is not specified');
    }

    return fetch(this.url, options);
  }
}

// Пример использования:
new RequestBuilder()
  .type('POST')
  .setUrl('https://api.example.com/data')
  .addHeader('Authorization', 'Bearer token')
  .setBody({ key: 'value' })
  .exec()
  .then(response => console.log(response))
  .catch(error => console.error(error));
