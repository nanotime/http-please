interface HttpPleaseOptions {
  url: string;
  options?: RequestInit;
  resolver?: 'json' | 'arrayBuffer' | 'blob' | 'formData' | 'text';
}

interface HttpResponse<Data> extends Response {
  data?: Data;
}

interface MethodParams {
  path: string;
  opts?: Omit<RequestInit, 'body' | 'method'>;
  query?: { [key: string]: string };
  body?: unknown;
}

export class HttpPlease {
  url: URL;
  options?: RequestInit;
  resolver: 'json' | 'arrayBuffer' | 'blob' | 'formData' | 'text';

  constructor({ url, options, resolver = 'json' }: HttpPleaseOptions) {
    try {
      this.url = new URL(url);
    } catch (error) {
      throw new Error('The provided url is invalid');
    }

    this.options = options;
    this.resolver = resolver;
  }

  async fetch<Data = unknown>(
    url: string,
    opts: RequestInit = {}
  ): Promise<HttpResponse<Data>> {
    const response: HttpResponse<Data> = await fetch(url, {
      ...this.options,
      ...opts,
    });
    return response;
  }

  async get<Data = unknown>({
    path,
    query,
    opts,
  }: MethodParams): Promise<HttpResponse<Data>> {
    const formattedUrl = this.formatUrl(path, query);
    const response = await this.fetch<Data>(formattedUrl, {
      method: 'GET',
      ...opts,
    });
    response.data = await response[this.resolver]();

    return response;
  }

  async post<Data = unknown>({
    path,
    query,
    body,
    opts,
  }: MethodParams): Promise<HttpResponse<Data>> {
    const formattedUrl = this.formatUrl(path, query);
    const response = await this.fetch<Data>(formattedUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      ...opts,
    });
    response.data = await response[this.resolver]();

    return response;
  }

  async put<Data = unknown>({
    path,
    query,
    body,
    opts,
  }: MethodParams): Promise<HttpResponse<Data>> {
    const formattedUrl = this.formatUrl(path, query);
    const response = await this.fetch<Data>(formattedUrl, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...opts,
    });
    response.data = await response[this.resolver]();

    return response;
  }

  async delete<Data = unknown>({
    path,
    query,
    opts,
  }: MethodParams): Promise<HttpResponse<Data>> {
    const formattedUrl = this.formatUrl(path, query);
    const response = await this.fetch<Data>(formattedUrl, {
      method: 'DELETE',
      ...opts,
    });
    response.data = await response[this.resolver]();

    return response;
  }

  private formatUrl(path: string, params?: Record<string, string>) {
    if (!params) {
      return `${this.url.origin}${path}${this.url.searchParams}`;
    }

    const query = new URLSearchParams([
      ...Array.from(this.url.searchParams.entries()),
      ...Object.entries(params),
    ]).toString();

    return `${this.url.origin}${path}?${query}`;
  }
}
