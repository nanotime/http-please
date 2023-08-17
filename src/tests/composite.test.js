import { test, expect, describe } from 'vitest';
import CreateHttpPlease from '../composite';

const client = CreateHttpPlease({
  options: { timeout: 5000 },
  url: 'https://example.com',
  resolver: 'json',
});

describe('CreateHttpPlease', () => {
  test('Should return an object with the correct properties', () => {
    expect(client).toHaveProperty('url');
    expect(client).toHaveProperty('options');
    expect(client).toHaveProperty('resolver');
    expect(client.resolver).toBe('json');
  });

  test('Should return an object with the correct methods', () => {
    expect(client).toHaveProperty('request');
    expect(client).toHaveProperty('get');
    expect(client).toHaveProperty('post');
    expect(client).toHaveProperty('put');
    expect(client).toHaveProperty('delete');
  });

  test('should compose plugins correctly', () => {
    const plugin1 = () => ({
      retutn1() {
        return 1;
      },
    });

    const plugin2 = () => ({
      return2() {
        return 2;
      },
    });

    const httpClient = CreateHttpPlease({
      url: 'https://example.com',
      plugins: [plugin1, plugin2],
    });

    expect(httpClient).to.have.property('retutn1').that.is.a('function');
    expect(httpClient).to.have.property('return2').that.is.a('function');
    expect(httpClient.retutn1()).toBe(1);
    expect(httpClient.return2()).toBe(2);
  });
});
