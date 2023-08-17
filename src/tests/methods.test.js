import { it, expect, describe, vi } from 'vitest';
import {
  fetchPlugin,
  getPlugin,
  postPlugin,
  putPlugin,
  deletePlugin,
} from '../methods';
import { InterceptorManager } from '../classes';

describe('fetchPlugin', () => {
  it('should create a new InterceptorManager for requestInterceptors and responseInterceptors', () => {
    const plugin = fetchPlugin();
    expect(plugin.requestInterceptors).toBeInstanceOf(InterceptorManager);
    expect(plugin.responseInterceptors).toBeInstanceOf(InterceptorManager);
  });

  it('should send a request to the specified URL with the given options', async () => {
    const url = 'https://example.com';
    const opts = { method: 'GET' };
    const response = { status: 200, data: 'success' };
    const fetchMock = vi.fn().mockResolvedValue(response);
    // eslint-disable-next-line no-undef
    global.fetch = fetchMock;

    const plugin = fetchPlugin();
    const result = await plugin.request(url, opts);

    expect(fetchMock).toHaveBeenCalledWith(url, {
      ...plugin.options,
      ...opts,
    });
    expect(result).toEqual(response);
  });
});

describe('getPlugin', () => {
  it('Should make get calls', async () => {
    const path = '/users';
    const params = { page: 1, limit: 10 };
    const data = { status: 200, data: 'success' };
    const get = getPlugin().get.bind({
      request: vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(data),
        })
      ),
      formatUrl: vi.fn(() => 'http://example.com' + path),
      resolver: 'json',
    });
    const result = await get({ path, params });
    expect(result.data).toBe(data);
  });
});

describe('postPlugin', () => {
  it('Should make post calls', async () => {
    const path = '/users';
    const params = { page: 1, limit: 10 };
    const data = { status: 200, data: 'success' };
    const body = {
      page: 2,
      limit: 10,
    };
    const post = postPlugin().post.bind({
      request: vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(data),
        })
      ),
      formatUrl: vi.fn(() => 'http://example.com' + path),
      resolver: 'json',
    });
    const result = await post({ path, params, body });
    expect(result.data).toBe(data);
  });
});

describe('putPlugin', () => {
  it('Should make put calls', async () => {
    const path = '/users';
    const params = { page: 1, limit: 10 };
    const data = { status: 200, data: 'success' };
    const body = {
      page: 2,
      limit: 10,
    };
    const put = putPlugin().put.bind({
      request: vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(data),
        })
      ),
      formatUrl: vi.fn(() => 'http://example.com' + path),
      resolver: 'json',
    });
    const result = await put({ path, params, body });
    expect(result.data).toBe(data);
  });
});

describe('deletePlugin', () => {
  it('Should make delete calls', async () => {
    const path = '/users';
    const params = { page: 1, limit: 10 };
    const data = { status: 200, data: 'success' };
    const deleteRequest = deletePlugin().delete.bind({
      request: vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(data),
        })
      ),
      formatUrl: vi.fn(() => 'http://example.com' + path),
      resolver: 'json',
    });
    const result = await deleteRequest({ path, params });
    expect(result.data).toBe(data);
  });
});
