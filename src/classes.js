export class HttpPlease {
  url;
  options;
  resolver;
  #plugins = ['get', 'post', 'put', 'delete', 'fetch', 'formatUrl'];

  constructor({ url, options, resolver = 'json', plugins }) {
    this.url = new URL(url);
    this.options = options;
    this.resolver = resolver;
    this.registerPlugins(plugins);
  }

  /**
   * Registers external plugins.
   *
   * @param {array} externalPlugins - An array of external plugins to be registered.
   * @throws {Error} Throws an error if a plugin is already registered.
   */
  registerPlugins(externalPlugins) {
    externalPlugins.forEach(extPlug => {
      let currentMethodName;
      const pluginMethodNames = Object.keys(extPlug());
      const found = pluginMethodNames.some(p => {
        currentMethodName = p;
        return this.#plugins.find(plg => plg === p);
      });

      if (found) {
        throw new Error(`${currentMethodName} is already registered`);
      }

      this.#plugins.push(currentMethodName);
    });
  }
}

export class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Adds a new handler to the list of handlers.
   *
   * @param {function} fullfilled - The function to be called when the promise is fulfilled.
   * @param {function} rejected - The function to be called when the promise is rejected.
   */
  use(fullfilled, rejected) {
    this.handlers.push([fullfilled, rejected]);
  }

  /**
   * Retrieves the value of the handlers property.
   *
   * @return {Array} The handlers array.
   */
  get() {
    return this.handlers;
  }
}
