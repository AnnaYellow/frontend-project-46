import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';
import result from '../__fixtures__/result.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filepath1JSON = path.resolve(__dirname, '../__fixtures__/file1.json');
const filepath2JSON = path.resolve(__dirname, '../__fixtures__/file2.json');
const filepath1YML = path.resolve(__dirname, '../__fixtures__/file1.yml');
const filepath2YML = path.resolve(__dirname, '../__fixtures__/file2.yml');

test('gendiff', () => {
  expect(genDiff(filepath1JSON, filepath2JSON)).toEqual(result);
  expect(genDiff(filepath1YML, filepath2YML)).toEqual(result);
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.yml')).toEqual(result);
});
