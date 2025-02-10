import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { jest } from '@jest/globals';
import 'whatwg-fetch';

global.fetch = jest.fn(async (): Promise<Response> => {
  // console.log('Mock fetch called with:', input, init);

  return new Promise((resolve) => {
    resolve(
      new Response(
        JSON.stringify({
          results: [
            {
              name: 'Luke Skywalker',
              gender: 'male',
              birth_year: '19BBY',
              url: 'https://swapi.dev/api/people/1/',
            },
          ],
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    );
  });
}) as jest.MockedFunction<typeof fetch>;

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
