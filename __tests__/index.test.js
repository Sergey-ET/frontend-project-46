import fs from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';
import plain from '../src/formatters/plain.js';
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

test('generate difference between files in plain format', () => {
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.json'), 'plain')).toEqual(readFile('expected_file_plain.diff'));
});

test('stylish should return empty string for unexpected diff type', () => {
  const diffs = [
    {
      type: 'unexpectedType',
      key: 'test',
      value: 'value',
    },
  ];

  const result = stylish(diffs);
  const expected = '{\n\n}';

  expect(result).toBe(expected);
});

test('stylish handles "deleted" diff type', () => {
  const diffs = [
    {
      type: 'deleted',
      key: 'test',
      value: 'value',
    },
  ];

  const result = stylish(diffs);
  const expected = '{\n  - test: value\n}';

  expect(result).toBe(expected);
});

test('stylish handles "added" diff type', () => {
  const diffs = [
    {
      type: 'added',
      key: 'test',
      value: 'value',
    },
  ];

  const result = stylish(diffs);
  const expected = '{\n  + test: value\n}';

  expect(result).toBe(expected);
});

test('stylish handles "updated" diff type', () => {
  const diffs = [
    {
      type: 'updated',
      key: 'test',
      valueBefore: 'oldValue',
      valueAfter: 'newValue',
    },
  ];

  const result = stylish(diffs);
  const expected = '{\n  - test: oldValue\n  + test: newValue\n}';

  expect(result).toBe(expected);
});

test('stylish handles "nested" diff type', () => {
  const diffs = [
    {
      type: 'nested',
      key: 'test',
      children: [
        {
          type: 'added',
          key: 'nestedKey',
          value: 'nestedValue',
        },
      ],
    },
  ];

  const result = stylish(diffs);
  const expected = '{\n    test: {\n      + nestedKey: nestedValue\n    }\n}';

  expect(result).toBe(expected);
});

test('stylish handles "unchanged" diff type', () => {
  const diffs = [
    {
      type: 'unchanged',
      key: 'test',
      value: 'value',
    },
  ];

  const result = stylish(diffs);
  const expected = '{\n    test: value\n}';

  expect(result).toBe(expected);
});

test('plain handles numbers correctly', () => {
  const diffs = [
    {
      type: 'added',
      key: 'test',
      value: 123,
    },
  ];

  const result = plain(diffs);
  const expected = "Property 'test' was added with value: 123";

  expect(result).toBe(expected);
});
