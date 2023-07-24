interface HttpPleaseOptions {
  url: string;
  options?: RequestInit;
}

interface HttpResponse<Data> extends Response {
  data?: Data;
}

interface MethodParams {
  path: string;
  query?: { [key: string]: string };
  body?: unknown;
}

export default class HttpPlease {
  url: URL;
  options?: RequestInit;

  constructor({ url, options }: HttpPleaseOptions) {
    // Can't specify method in options
    delete options?.method;
    this.url = new URL(url);
    this.options = options;
  }

  async get<Data>({ path, query }: MethodParams): Promise<HttpResponse<Data>> {
    const formattedUrl = this.formatUrl(path, query);
    const response: HttpResponse<Data> = await fetch(formattedUrl, {
      method: 'GET',
      ...this.options,
    });
    response.data = await response.json();

    return response;
  }

  async post<Data>({
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
    response.data = await response.json();

    return response;
  }

  async put<Data>({
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
    response.data = await response.json();

    return response;
  }

  async delete<Data>({
    path,
    query,
  }: MethodParams): Promise<HttpResponse<Data>> {
    const formattedUrl = this.formatUrl(path, query);
    const response: HttpResponse<Data> = await fetch(formattedUrl, {
      method: 'DELETE',
      ...this.options,
    });
    response.data = await response.json();

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
