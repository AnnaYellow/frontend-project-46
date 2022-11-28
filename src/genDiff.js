import parser from './parsers.js';
import getDifferenceTree from './ast.js';
import makeDiff from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parser(filepath1);
  const data2 = parser(filepath2);
  const differenceTree = getDifferenceTree(data1, data2);
  const result = makeDiff(differenceTree, formatName);
  return result;
};

export default genDiff;
