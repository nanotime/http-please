import { it, expect, describe, beforeEach, vi } from 'vitest';
import HttpPlease from '../index';

describe('HttpPlease: instance', () => {
  const Instance = new HttpPlease({
    options: { headers: { 'Content-Type': 'application/json' } },
    url: 'https://example.com',
    resolver: 'json',
  });

  it('Should create the correct instance', () => {
    expect(Instance.url).toBeInstanceOf(URL);
    expect(Instance.resolver).toBe('json');
    expect(Instance).toHaveProperty('options');
  });

  it('Should have the correct methods', () => {
    expect(Instance).toHaveProperty('request');
    expect(Instance).toHaveProperty('get');
    expect(Instance).toHaveProperty('post');
    expect(Instance).toHaveProperty('put');
    expect(Instance).toHaveProperty('delete');
  });
});

describe('HttpPlease: http methods', () => {
  let Instance: HttpPlease;
  beforeEach(() => {
    Instance = new HttpPlease({
      options: { headers: { 'Content-Type': 'application/json' } },
      url: 'https://example.com',
      resolver: 'json',
    });
  });

  it('Should make a request', async () => {
    const url = 'https://example.com';
    const opts = { method: 'GET' };
    const response = { status: 200, data: 'success' };
    const fetchMock = vi.fn().mockResolvedValue(response);
    global.fetch = fetchMock;

    const result = await Instance.request(url, opts);

    expect(result).toEqual(response);
  });

  it('Should make get requests', async () => {
    it('should send a GET request to the specified path and return the response', async () => {
      const mockResponse = new Response();
      vi.spyOn(Instance, 'get').mockResolvedValue(mockResponse);

      const path = '/api/users';
      const resolver = 'json';
      const opts = { headers: { Authorization: 'Bearer token' } };

      const response = await Instance.get({ path, resolver, opts });

      expect(Instance.get).toHaveBeenCalledOnce();

      expect(response).toEqual({
        ...mockResponse,
        data: await mockResponse[resolver](),
      });
    });

    it('should send a POST request to the specified path and return the response', async () => {
      const mockResponse = new Response();
      vi.spyOn(Instance, 'post').mockResolvedValue(mockResponse);

      const path = '/api/users';
      const resolver = 'json';
      const opts = { headers: { Authorization: 'Bearer token' } };
      const body = { name: 'John Doe' };

      const response = await Instance.post({ path, resolver, opts, body });

      expect(Instance.post).toHaveBeenCalledOnce();

      expect(response).toEqual({
        ...mockResponse,
        data: await mockResponse[resolver](),
      });
    });

    it('should send a PUT request to the specified path and return the response', async () => {
      const mockResponse = new Response();
      vi.spyOn(Instance, 'put').mockResolvedValue(mockResponse);

      const path = '/api/users';
      const resolver = 'json';
      const opts = { headers: { Authorization: 'Bearer token' } };
      const body = { name: 'John Doe' };

      const response = await Instance.put({ path, resolver, opts, body });

      expect(Instance.put).toHaveBeenCalledOnce();

      expect(response).toEqual({
        ...mockResponse,
        data: await mockResponse[resolver](),
      });
    });

    it('should send a DELETE request to the specified path and return the response', async () => {
      const mockResponse = new Response();
      vi.spyOn(Instance, 'delete').mockResolvedValue(mockResponse);

      const path = '/api/users';
      const resolver = 'json';
      const opts = { headers: { Authorization: 'Bearer token' } };

      const response = await Instance.delete({ path, resolver, opts });

      expect(Instance.delete).toHaveBeenCalledOnce();

      expect(response).toEqual({
        ...mockResponse,
        data: await mockResponse[resolver](),
      });
    });
  });
});

describe('HttpPlease: query method', () => {
  let Instance: HttpPlease;
  beforeEach(() => {
    Instance = new HttpPlease({
      options: { headers: { 'Content-Type': 'application/json' } },
      url: 'https://example.com',
      resolver: 'json',
    });
  });

  it('should format a URL with emtpy parameters', () => {
    const result = Instance.query({});
    expect(result.url).toBe('https://example.com?');
  });

  it('should format a URL with single parameter', () => {
    const result = Instance.query({ key: 'value' });
    expect(result.url).toBe('https://example.com?key=value');
  });

  it('should format a URL with multiple parameters', () => {
    const result = Instance.query({ key1: 'value1', key2: 'value2' });
    expect(result.url).toBe('https://example.com?key1=value1&key2=value2');
  });
});

describe('HttpPlease: pathFactory method', () => {
  it('Should return the new pathname on URL', () => {
    const Instance = new HttpPlease({
      url: 'https://example.com',
    });

    const result: URL = Instance.pathFactory('/users');
    expect(result.pathname).toBe('/users');
  });
});
