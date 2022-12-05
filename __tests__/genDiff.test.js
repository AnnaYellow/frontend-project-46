import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';
import stylishResult from '../__fixtures__/stylishResult.js';
import plainResult from '../__fixtures__/plainResult.js';
import jsonResult from '../__fixtures__/jsonResult.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  {
    file1: getFixturePath('file1.json'), file2: getFixturePath('file2.json'), format: 'stylish', expected: stylishResult,
  },
  {
    file1: getFixturePath('file1.yml'), file2: getFixturePath('file2.yml'), format: 'stylish', expected: stylishResult,
  },
  {
    file1: getFixturePath('file1.json'), file2: getFixturePath('file2.yml'), format: 'stylish', expected: stylishResult,
  },
  {
    file1: getFixturePath('file1.json'), file2: getFixturePath('file2.json'), format: 'plain', expected: plainResult,
  },
  {
    file1: getFixturePath('file1.yml'), file2: getFixturePath('file2.yml'), format: 'plain', expected: plainResult,
  },
  {
    file1: getFixturePath('file1.json'), file2: getFixturePath('file2.yml'), format: 'plain', expected: plainResult,
  },
  {
    file1: getFixturePath('file1.json'), file2: getFixturePath('file2.json'), format: 'json', expected: jsonResult,
  },
  {
    file1: getFixturePath('file1.yml'), file2: getFixturePath('file2.yml'), format: 'json', expected: jsonResult,
  },
  {
    file1: getFixturePath('file1.json'), file2: getFixturePath('file2.yml'), format: 'json', expected: jsonResult,
  },

])('genDiff $format', ({
  file1, file2, format, expected,
}) => {
  const result = genDiff(file1, file2, format);
  expect(result).toEqual(expected);
});

test.each([
  { file1: getFixturePath('file1.json'), file2: getFixturePath('file2.json'), expected: stylishResult },
  { file1: getFixturePath('file1.yml'), file2: getFixturePath('file2.yml'), expected: stylishResult },
  { file1: getFixturePath('file1.json'), file2: getFixturePath('file2.yml'), expected: stylishResult },
])('genDiff default format', ({ file1, file2, expected }) => {
  const result = genDiff(file1, file2);
  expect(result).toEqual(expected);
});
