import fs from 'fs';
import path from 'path';
import getDifferenceTree from './getDifferenceTree.js';
import makeDiff from './formatters/index.js';
import parse from './parse.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const getData = (filepath) => {
  const absolutePath = getAbsolutePath(filepath);
  const formatName = path.extname(absolutePath).slice(1);
  const readFile = fs.readFileSync(absolutePath, 'utf-8');
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
