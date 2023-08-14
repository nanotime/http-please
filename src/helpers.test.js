import { test, expect, describe } from 'vitest';
import { formatUrlPlugin } from './helpers.js';

describe('formatUrlPlugin', () => {
  const url = new URL('http://example.com');
  const plugin = formatUrlPlugin().formatUrl.bind({ url });

  test('should format URL without query parameters', () => {
    const path = '/users';
    const formattedUrl = plugin(path);
    expect(formattedUrl).toBe('http://example.com/users');
  });

  test('should format URL with query parameters', () => {
    const path = '/users';
    const params = { page: 1, limit: 10 };
    const formattedUrl = plugin(path, params);
    expect(formattedUrl).toBe('http://example.com/users?page=1&limit=10');
  });

  test('should format URL with existing query parameters', () => {
    const path = '/users';
    const params = { sort: 'name' };
    const formattedUrl = plugin(path, params);
    expect(formattedUrl).toBe('http://example.com/users?sort=name');
  });

  test('should format URL with both existing and new query parameters', () => {
    const path = '/users';
    const params = { page: 2, limit: 10 };
    const formattedUrl = plugin(path, params);
    expect(formattedUrl).toBe('http://example.com/users?page=2&limit=10');
  });
});
