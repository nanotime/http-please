/**
 * This code snippet defines a function CreateHttpPlease that creates an HTTP client with extended functionality by
 * composing various plugins. The function takes in a configuration object options, a base URL url, a resolver function
 * resolver, and an array of plugins plugins. It returns a composed HTTP client object that includes the
 * functionality provided by the plugins.
 */

import { HttpPlease } from './http-please';

import {
  getPlugin,
  postPlugin,
  putPlugin,
  deletePlugin,
  fetchPlugin,
} from './methods';
import { formatUrlPlugin } from './helpers';

/**
 * @typedef {Object} HttpPlese
 * @property {string} url - The base URL for the HTTP requests.
 * @property {Object} options - The configuration options for a fetch request.
 * @property {string} resolver - The resolver function for handling asynchronous operations.
 * @property {Function} fetch - Fetch method
 * @property {Function} get - HTTP get method
 * @property {Function} post - HTTP post method
 * @property {Function} put - HTTP put method
 * @property {Function} delete - HTTP delete method
 * @property {Function} formatUrl - formatUrl method
 */

/**
 * Creates an HTTP client with extended functionality by composing various plugins.
 *
 * @param {Object} options - The configuration options for the HTTP client.
 * @param {string} url - The base URL for the HTTP requests.
 * @param {string} resolver - The resolver function for handling asynchronous operations.
 * @param {Array} plugins - An array of plugins to extend the functionality of the HTTP client.
 * @return {HttpPlease} - The composed HTTP client object.
 */
export function CreateHttpPlease({ options, url, resolver, plugins = [] }) {
  const http = new HttpPlease({ url, options, resolver, plugins });

  const plugs = plugins.reduce((prev, plugin) => {
    return { ...prev, ...plugin() };
  }, {});

  const composition = {
    ...http,
    ...fetchPlugin(),
    ...getPlugin(),
    ...postPlugin(),
    ...putPlugin(),
    ...deletePlugin(),
    ...formatUrlPlugin(),
    ...plugs,
  };

  return composition;
}
