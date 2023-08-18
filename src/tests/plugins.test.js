import { it, expect, describe, beforeAll } from 'vitest';
import { queryPlugin } from '../plugins/index';

describe('queryPlugin', () => {
  let query;

  beforeAll(() => {
    query = queryPlugin().query.bind({
      url: new URL('http://example.com'),
    });
  });

  it('should format a URL with emtpy parameters', () => {
    const result = query({});
    expect(result.url).toBe('http://example.com?');
  });

  it('should format a URL with single parameter', () => {
    const result = query({ key: 'value' });
    expect(result.url).toBe('http://example.com?key=value');
  });

  it('should format a URL with multiple parameters', () => {
    const result = query({ key1: 'value1', key2: 'value2' });
    expect(result.url).toBe('http://example.com?key1=value1&key2=value2');
  });
});
