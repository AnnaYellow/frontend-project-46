import fs from 'fs';
import path from 'path';
import getDifferenceTree from './getDifferenceTree.js';
import makeDiff from './formatters/index.js';
import parse from './parse.js';

const normalizeFilepath = (filepath) => path.resolve(process.cwd(), filepath);

const getData = (filepath) => {
  const normalizedFilepath = normalizeFilepath(filepath);
  const formatName = path.extname(normalizedFilepath).slice(1);
  const readFile = fs.readFileSync(normalizedFilepath, 'utf-8');
  const parsedData = parse(readFile, formatName);
  return parsedData;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const differenceTree = getDifferenceTree(data1, data2);
  const result = makeDiff(differenceTree, formatName);
  return result;
};

export default genDiff;
