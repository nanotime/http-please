/**
 * This code snippet defines a function CreateHttpPlease that creates an HTTP client with extended functionality by
 * composing various plugins. The function takes in a configuration object options, a base URL url, a resolver function
 * resolver, and an array of plugins plugins. It returns a composed HTTP client object that includes the
 * functionality provided by the plugins.
 */

import { HttpPlease } from './classes';

import {
  getPlugin,
  postPlugin,
  putPlugin,
  deletePlugin,
  fetchPlugin,
} from './methods';

/**
 * Creates an HTTP client with extended functionality by composing various plugins.
 *
 * @param {Object} options - The configuration options for the HTTP client.
 * - {string} url - The base URL for the HTTP requests.
 * - {srting} resolver - The resolver function for handling asynchronous operations.
 * - {array} plugins - An array of plugins to extend the functionality of the HTTP client.
 * @return {Object} - The composed HTTP client object.
 * - fetch - Fetch method
 * - get - HTTP get method
 * - post - HTTP post method
 * - put - HTTP put method
 * - delete - HTTP delete method
 * - formatUrl - formatUrl method
 */
export default function CreateHttpPlease({
  options,
  url,
  resolver,
  plugins = [],
}) {
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
    ...plugs,
  };

  return composition;
}
