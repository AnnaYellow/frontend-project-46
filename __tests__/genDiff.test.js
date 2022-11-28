import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';
import genDiff from '../src/genDiff.js';
import stylishResult from '../__fixtures__/stylishResult.js';
import plainResult from '../__fixtures__/plainResult.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.yml');

test('stylish', () => {
  expect(genDiff(filepath1, filepath2)).toEqual(stylishResult);
});

test('plain', () => {
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plainResult);
});
