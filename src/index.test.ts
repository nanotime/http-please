// src/index.test.ts
import { test, expect, describe, beforeAll } from 'vitest';
import { HttpPlease } from './index';

describe('HttpPlease definitions', () => {
  let httpPlease: HttpPlease;
  beforeAll(() => {
    httpPlease = new HttpPlease({ url: 'https://example.com', options: {} });
  });

  test('Instance should exist', () => {
    expect(httpPlease).toBeDefined();
  });

  test('Instance should have a url property', () => {
    expect(httpPlease.url).toBeDefined();
  });

  test('Instance should have an options property', () => {
    expect(httpPlease.options).toBeDefined();
  });

  test('Instance should have a get method', () => {
    expect(httpPlease.get).toBeDefined();
  });

  test('Instance should have a post method', () => {
    expect(httpPlease.post).toBeDefined();
  });

  test('Instance should have a put method', () => {
    expect(httpPlease.put).toBeDefined();
  });

  test('Instance should have a delete method', () => {
    expect(httpPlease.delete).toBeDefined();
  });
});

describe('HttpPlease instance', () => {
  test('Should throw if no url is provided', () => {
    expect(() => new HttpPlease({ url: '' })).toThrowError(
      'The provided url is invalid'
    );
  });
});
