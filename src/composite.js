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
import { formatUrlPlugin } from './helpers';

/**
 * Creates an HTTP client with extended functionality by composing various plugins.
 *
 * @param {Object} options - The configuration options for the HTTP client.
 * @prop {string} url - The base URL for the HTTP requests.
 * @prop {srting} resolver - The resolver function for handling asynchronous operations.
 * @prop {array} plugins - An array of plugins to extend the functionality of the HTTP client.
 * @return {Object} - The composed HTTP client object.
 * @prop fetch - Fetch method
 * @prop get - HTTP get method
 * @prop post - HTTP post method
 * @prop put - HTTP put method
 * @prop delete - HTTP delete method
 * @prop formatUrl - formatUrl method
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
    ...formatUrlPlugin(),
    ...plugs,
  };

  return composition;
}
