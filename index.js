import getData from './src/getData.js';
import getDifferenceTree from './src/getDifferenceTree.js';
import makeDiff from './src/formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const differenceTree = getDifferenceTree(data1, data2);
  const result = makeDiff(differenceTree, formatName);
  return result;
};

export default genDiff;
