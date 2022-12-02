import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';
import genDiff from '../index.js';
import stylishResult from '../__fixtures__/stylishResult.js';
import plainResult from '../__fixtures__/plainResult.js';
import jsonResult from '../__fixtures__/jsonResult.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  [getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish', stylishResult],
  [getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish', stylishResult],
  [getFixturePath('file1.json'), getFixturePath('file2.yml'), 'stylish', stylishResult],
])('stylish', (file1, file2, format, expected) => {
  const result = genDiff(file1, file2, format);
  expect(result).toEqual(expected);
});

test.each([
  [getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain', plainResult],
  [getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain', plainResult],
  [getFixturePath('file1.json'), getFixturePath('file2.yml'), 'plain', plainResult],
])('plain', (file1, file2, format, expected) => {
  const result = genDiff(file1, file2, format);
  expect(result).toEqual(expected);
});

test.each([
  [getFixturePath('file1.json'), getFixturePath('file2.json'), 'json', jsonResult],
  [getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json', jsonResult],
  [getFixturePath('file1.json'), getFixturePath('file2.yml'), 'json', jsonResult],
])('json', (file1, file2, format, expected) => {
  const result = genDiff(file1, file2, format);
  expect(result).toEqual(expected);
});

test.each([
  [getFixturePath('file1.json'), getFixturePath('file2.json'), stylishResult],
  [getFixturePath('file1.yml'), getFixturePath('file2.yml'), stylishResult],
  [getFixturePath('file1.json'), getFixturePath('file2.yml'), stylishResult],
])('default format', (file1, file2, expected) => {
  const result = genDiff(file1, file2);
  expect(result).toEqual(expected);
});
