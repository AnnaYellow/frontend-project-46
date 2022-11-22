import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const difference = '{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';
const filepath1 = path.resolve(__dirname, '../__fixtures__/file1.json');
const filepath2 = path.resolve(__dirname, '../__fixtures__/file2.json');
const filepath3 = path.resolve(__dirname, '../__fixtures__/file1.js');

test('gendiff', () => {
  expect(genDiff(filepath1, filepath2)).toEqual(difference);
  expect(genDiff('', '')).toEqual(null);
  expect(genDiff(filepath1, filepath3)).toEqual(null);
});
