import { it, expect, describe, beforeEach, vi } from 'vitest';
import { HttpPlease, InterceptorManager } from '../classes';

describe('HttpPlease', () => {
  describe('constructor', () => {
    it('should initialize the url, options, resolver, and plugins', () => {
      const url = 'https://example.com/';
      const options = { headers: { 'Content-Type': 'application/json' } };
      const resolver = 'json';
      const plugins = [() => ({ foo: () => {} }), () => ({ bar: () => {} })];

      const httpPlease = new HttpPlease({ url, options, resolver, plugins });

      expect(httpPlease.url.toString()).toBe(url);
      expect(httpPlease.options).toBe(options);
      expect(httpPlease.resolver).toBe(resolver);
      expect(httpPlease.plugins).toEqual([
        'get',
        'post',
        'put',
        'delete',
        'fetch',
        'formatUrl',
        'foo',
        'bar',
      ]);
    });
  });
});

describe('InterceptorManager', () => {
  let interceptorManager;

  beforeEach(() => {
    interceptorManager = new InterceptorManager();
  });

  it('should initialize with an empty handlers array', () => {
    expect(interceptorManager.get()).toEqual([]);
  });

  it('should add a new handler to the handlers array', () => {
    const fulfilled = vi.fn();
    const rejected = vi.fn();

    interceptorManager.use(fulfilled, rejected);

    expect(interceptorManager.get()).toEqual([[fulfilled, rejected]]);
  });
});
