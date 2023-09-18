type Resolver = 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData';

type RequestParams = {
  path: string;
  opts?: Omit<RequestInit, 'method' | 'body'>;
  resolver?: Resolver;
};

type PostRequestParams = RequestParams & { body: unknown };

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
   *
   * @param {string | URL} url - The URL to send the request to.
   * @param {RequestInit} [opts] - Optional request options.
   * @return {Promise<Response>} A promise that resolves with the response to the request.
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
   *
   * @param {Object} - The parameters for the GET request.
   * @prop {string} param.path - The path for the GET request. Defaults to an empty string.
   * @prop {string} param.resolver - The resolver function to be used for parsing the response. Defaults to null.
   * @prop {any} param.opts - Additional options for the GET request. Defaults to null.
   * @return {Promise} - The response of the GET request.
   */
  async get<R>({ path = '', resolver, opts }: RequestParams) {
    const configuredPath = this.pathFactory(path);
    const response: HttpPleaseResponse<R> = await this.request(configuredPath, {
      method: 'GET',
      ...opts,
    });
    response.data = await response[resolver ? resolver : this.resolver]();
    return response;
  }

  /**
   * Sends a POST request to the specified path with the provided body and options.
   *
   * @param {Object} - The parameters for the POST request.
   * @prop {string} param.path - The path for the POST request. Defaults to an empty string.
   * @prop {Function} param.resolver - The resolver function to be used for parsing the response. Defaults to null.
   * @prop {any} param.opts - Additional options for the POST request. Defaults to null.
   * @prop {any} param.body - The body of the POST request.
   * @return {Promise} - The response of the POST request.
   */
  async post<R>({ path = '', resolver, opts, body }: PostRequestParams) {
    const configuredPath = this.pathFactory(path);
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
   *
   * @param {Object} - The parameters for the PUT request.
   * @prop {string} param.path - The path for the PUT request. Defaults to an empty string.
   * @prop {string} param.resolver - The resolver function to be used for parsing the response. Defaults to null.
   * @prop {any} param.opts - Additional options for the PUT request. Defaults to null.
   * @prop {any} param.body - The body of the PUT request.
   * @return {Promise} - The response of the PUT request.
   */
  async put<R>({ path = '', resolver, opts, body }: PostRequestParams) {
    const configuredPath = this.pathFactory(path);
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
   * @param {Object} - The parameters for the DELETE request.
   * @prop {string} param.path - The path for the DELETE request. Defaults to an empty string.
   * @prop {string} param.resolver - The resolver function to be used for parsing the response. Defaults to null.
   * @prop {any} param.opts - Additional options for the DELETE request. Defaults to null.
   * @return {Promise} - The response of the DELETE request.
   */
  async delete<R>({ path = '', resolver, opts }: RequestParams) {
    const configuredPath = this.pathFactory(path);
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
   *
   * @param {Object} params - An object containing key-value pairs of parameters.
   * @return {Object} - A new object with the updated URL.
   */
  query(params: { [key: string]: string }) {
    const entries = Array.from(this.url.searchParams.entries());
    const query = new URLSearchParams([
      ...entries,
      ...Object.entries(params),
    ]).toString();

    return { ...this, url: `${this.url.origin}?${query}` };
  }

  /**
   * Creates a new URL by appending the given path to the base URL.
   *
   * @param {string} path - The path to be appended to the base URL.
   * @return {URL} - The new URL object with the appended path.
   */
  pathFactory(path: string) {
    const pathUrl = new URL(this.url);
    pathUrl.pathname = path;
    return pathUrl;
  }
}
