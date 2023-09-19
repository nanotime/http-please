type Resolver = 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData';
type Query = { [key: string]: string };

type RequestParams = {
  path: string;
  query?: Query;
  opts?: Omit<RequestInit, 'method' | 'body'>;
  resolver?: Resolver;
};

type PostRequestParams = RequestParams & { body: unknown };

interface QP {
  params: Query;
  url: URL;
}
interface HttpPleaseResponse<T = unknown> extends Response {
  data?: T;
}

interface ConstructorProps {
  url: string;
  options?: RequestInit;
  resolver?: Resolver;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T = HttpPlease> = new (...args: any[]) => T;

export default class HttpPlease {
  url: URL;
  options?: RequestInit;
  resolver: Resolver = 'json';

  constructor({ url, options, resolver }: ConstructorProps) {
    this.url = new URL(url);
    this.options = options;
    this.resolver = resolver || this.resolver;
  }

  /**
   * Sends an asynchronous HTTP request to the specified URL with optional request options.
   */
  async request(url: string | URL, opts?: RequestInit) {
    const req = fetch(url, {
      ...this.options,
      ...opts,
    });
    return req;
  }

  /**
   * Sends a GET request to the specified path with the provided body and options.
   */
  async get<R>({ path = '', query = {}, resolver, opts }: RequestParams) {
    const configuredPath = this.queryFactory({
      params: query,
      url: this.pathFactory(path),
    });
    const response: HttpPleaseResponse<R> = await this.request(configuredPath, {
      method: 'GET',
      ...opts,
    });
    response.data = await response[resolver ? resolver : this.resolver]();
    return response;
  }

  /**
   * Sends a POST request to the specified path with the provided body and options.
   */
  async post<R>({
    path = '',
    query = {},
    resolver,
    opts,
    body,
  }: PostRequestParams) {
    const configuredPath = this.queryFactory({
      params: query,
      url: this.pathFactory(path),
    });
    const response: HttpPleaseResponse<R> = await this.request(configuredPath, {
      method: 'POST',
      body: JSON.stringify(body),
      ...opts,
    });
    response.data = await response[resolver ? resolver : this.resolver]();
    return response;
  }

  /**
   * Sends a PUT request to the specified path with the provided body and options.
   */
  async put<R>({
    path = '',
    query = {},
    resolver,
    opts,
    body,
  }: PostRequestParams) {
    const configuredPath = this.queryFactory({
      params: query,
      url: this.pathFactory(path),
    });
    const response: HttpPleaseResponse<R> = await this.request(configuredPath, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...opts,
    });
    response.data = await response[resolver ? resolver : this.resolver]();
    return response;
  }

  /**
   * Sends a DELETE request to the specified path with the provided body and options.
   *
   */
  async delete<R>({ path = '', query = {}, resolver, opts }: RequestParams) {
    const configuredPath = this.queryFactory({
      params: query,
      url: this.pathFactory(path),
    });
    const response: HttpPleaseResponse<R> = await this.request(configuredPath, {
      method: 'DELETE',
      ...opts,
    });
    response.data = await response[resolver ? resolver : this.resolver]();
    return response;
  }

  /**
   * Generates a query string by combining the existing search parameters of the URL
   * with the provided parameters.
   */
  queryFactory({ params, url }: QP) {
    const entries = Array.from(this.url.searchParams.entries());
    const query = new URLSearchParams([...entries, ...Object.entries(params)]);
    const innerUrl = new URL(url);

    for (const [key, value] of query) {
      innerUrl.searchParams.set(key, value);
    }

    return innerUrl;
  }

  /**
   * Creates a new URL by appending the given path to the base URL.
   */
  pathFactory(path: string) {
    const pathUrl = new URL(this.url);
    pathUrl.pathname = path;
    return pathUrl;
  }
}
