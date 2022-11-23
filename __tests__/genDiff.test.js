import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';
import result from '../__fixtures__/result.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filepath1 = path.resolve(__dirname, '../__fixtures__/file1.json');
const filepath2 = path.resolve(__dirname, '../__fixtures__/file2.json');
const filepath3 = path.resolve(__dirname, '../__fixtures__/file1.js');

test('gendiff', () => {
  expect(genDiff(filepath1, filepath2)).toEqual(result);
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(result);
  expect(genDiff('', '')).toEqual(null);
  expect(genDiff(filepath1, filepath3)).toEqual(null);
});
