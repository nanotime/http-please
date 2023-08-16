import { InterceptorManager } from './classes';

export function fetchPlugin() {
  return {
    // Create a new InterceptorManager for handling request/reponse interceptors
    // This objects will manage the list of interceptors and provide methods for adding and removing interceptors
    // It will be assigned to the property 'requestInterceptors' and 'responseInterceptors'
    requestInterceptors: new InterceptorManager(),
    responseInterceptors: new InterceptorManager(),
    /**
     * Asynchronously sends a request to the specified URL with the given options.
     *
     * @param {string} url - The URL to send the request to.
     * @param {object} opts - The options for the request. Default is an empty object.
     * @return {Promise} A promise that resolves with the response from the server.
     */
    async request(url, opts = {}) {
      let promise;
      const reqInter = this.requestInterceptors.get().reverse();
      const resInter = this.responseInterceptors.get();
      const response = fetch(url, {
        ...this.options,
        ...opts,
      });

      const chain = [...reqInter, [response], ...resInter];

      while (chain.length) {
        const [fulfilled, rejected] = chain.shift();
        promise = response.then(fulfilled, rejected);
      }

      return promise;
    },
  };
}

export function getPlugin() {
  return {
    /**
     * Retrieves data from a specified path with optional query parameters.
     *
     * @param {object} params - An object containing the following properties:
     *   - path {string} - The path to retrieve data from.
     *   - query {object} - Optional query parameters.
     *   - opts {object} - Additional options for the request.
     * @return {Promise<object>} - A promise that resolves to the response object.
     */
    async get({ path, query, opts }) {
      const formattedUrl = this.formatUrl(path, query);
      const response = await this.request(formattedUrl, {
        method: 'GET',
        ...opts,
      });
      response.data = await response[this.resolver]();

      return response;
    },
  };
}

export function postPlugin() {
  return {
    /**
     * Sends a POST request to the specified path with the given query, body, and options.
     *
     * @param {Object} params - The options object.
     * - path {string} - The path for the request.
     * - query {object} - The query parameters for the request.
     * - body {object} - The body of the request.
     * - opts {object} - Additional options for the request.
     * @return {Promise<Object>} A promise that resolves to the response object.
     */
    async post({ path, query, body, opts }) {
      const formattedUrl = this.formatUrl(path, query);
      const response = await this.request(formattedUrl, {
        method: 'POST',
        body: JSON.stringify(body),
        ...opts,
      });
      response.data = await response[this.resolver]();
      return response;
    },
  };
}

export function putPlugin() {
  return {
    /**
     * Sends a PUT request to the specified path with the given query parameters, request body, and options.
     *
     * @param {object} params - An object containing the path, query parameters, request body, and options.
     *   - {string} path - The path for the PUT request.
     *   - {object} query - The query parameters for the request.
     *   - {object} body - The request body.
     *   - {object} opts - The options for the request.
     * @return {Promise<object>} A Promise that resolves to the response object with the data from the PUT request.
     */
    async put({ path, query, body, opts }) {
      const formattedUrl = this.formatUrl(path, query);
      const response = await this.request(formattedUrl, {
        method: 'PUT',
        body: JSON.stringify(body),
        ...opts,
      });
      response.data = await response[this.resolver]();

      return response;
    },
  };
}

export function deletePlugin() {
  return {
    /**
     * Deletes a resource using the specified path, query, and options.
     *
     * @param {Object} parama - An object containing the following properties:
     *   - {string} path - The path of the resource to delete.
     *   - {Object} query - The query parameters for the request.
     *   - {Object} opts - Additional options for the request.
     * @return {Promise<Object>} A Promise that resolves to the response object.
     */
    async delete({ path, query, opts }) {
      const formattedUrl = this.formatUrl(path, query);
      const response = await this.request(formattedUrl, {
        method: 'DELETE',
        ...opts,
      });
      response.data = await response[this.resolver]();
      return response;
    },
  };
}
