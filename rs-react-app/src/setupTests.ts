import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

fetchMock.enableMocks();
