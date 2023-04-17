import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('generate difference between flat JSON files', () => {
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.json'))).toEqual(expectedResult);
});

test('generate difference between flat YML files', () => {
  expect(genDiff(getFixturePath('before.yml'), getFixturePath('after.yml'))).toEqual(expectedResult);
});

test('generate difference between flat YAML files', () => {
  expect(genDiff(getFixturePath('before.yaml'), getFixturePath('after.yaml'))).toEqual(expectedResult);
});

test('generate difference between flat files', () => {
  expect(genDiff(getFixturePath('.before'), getFixturePath('.after'))).toEqual(expectedResult);
});
