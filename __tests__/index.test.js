import fs from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';
import stylish from '../src/formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('generate difference between JSON files', () => {
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.json'))).toEqual(readFile('expected_file.diff'));
});

test('generate difference between YAML files', () => {
  expect(genDiff(getFixturePath('before.yaml'), getFixturePath('after.yaml'))).toEqual(readFile('expected_file.diff'));
});

test('generate difference between YML files', () => {
  expect(genDiff(getFixturePath('before.yml'), getFixturePath('after.yml'))).toEqual(readFile('expected_file.diff'));
});

test('generate difference between files as default', () => {
  expect(genDiff(getFixturePath('.before'), getFixturePath('.after'))).toEqual(readFile('expected_file.diff'));
});

test('stringify non-object data', () => {
  const data = 'some string';
  expect(stylish(data)).toBe(data);
});
