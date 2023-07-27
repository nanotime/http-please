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
  query?: { [key: string]: string };
  body?: unknown;
}

export class HttpPlease {
  url: URL;
  options?: RequestInit;
  resolver: 'json' | 'arrayBuffer' | 'blob' | 'formData' | 'text';

  constructor({ url, options, resolver = 'json' }: HttpPleaseOptions) {
    // Can't specify method in options
    delete options?.method;

    try {
      this.url = new URL(url);
    } catch (error) {
      throw new Error('The provided url is invalid');
    }

    this.options = options;
    this.resolver = resolver;
  }

  async get<Data = unknown>({
    path,
    query,
  }: MethodParams): Promise<HttpResponse<Data>> {
    const formattedUrl = this.formatUrl(path, query);
    const response: HttpResponse<Data> = await fetch(formattedUrl, {
      method: 'GET',
      ...this.options,
    });
    response.data = await response[this.resolver]();

    return response;
  }

  async post<Data = unknown>({
    path,
    query,
    body,
  }: MethodParams): Promise<HttpResponse<Data>> {
    const formattedUrl = this.formatUrl(path, query);
    const response: HttpResponse<Data> = await fetch(formattedUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      ...this.options,
    });
    response.data = await response[this.resolver]();

    return response;
  }

  async put<Data = unknown>({
    path,
    query,
    body,
  }: MethodParams): Promise<HttpResponse<Data>> {
    const formattedUrl = this.formatUrl(path, query);
    const response: HttpResponse<Data> = await fetch(formattedUrl, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...this.options,
    });
    response.data = await response[this.resolver]();

    return response;
  }

  async delete<Data = unknown>({
    path,
    query,
  }: MethodParams): Promise<HttpResponse<Data>> {
    const formattedUrl = this.formatUrl(path, query);
    const response: HttpResponse<Data> = await fetch(formattedUrl, {
      method: 'DELETE',
      ...this.options,
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
