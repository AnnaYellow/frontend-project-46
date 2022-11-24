import parser from './parsers.js';
import getDifferenceTree from './ast.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parser(filepath1);
  const data2 = parser(filepath2);
  const differenceTree = getDifferenceTree(data1, data2);

  const differencesToPrint = differenceTree.map((node) => {
    if (node.status === 'added') {
      return `+ ${node.name}: ${node.value}`;
    }
    if (node.status === 'deleted') {
      return `- ${node.name}: ${node.value}`;
    }
    if (node.status === 'unchanged') {
      return `  ${node.name}: ${node.value}`;
    }
    return `- ${node.name}: ${node.value}\n+ ${node.name}: ${node.newValue}`;
  });
  const result = ['{', ...differencesToPrint, '}'].join('\n');
  console.log(result);
  return result;
};

export default genDiff;
