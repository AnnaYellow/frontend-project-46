import parseJSON from './parsers.js';
import getDifferenceTree from './ast.js';

const genDiff = (filepath1, filepath2) => {
  if (!filepath1.endsWith('json') || !filepath2.endsWith('json')) {
    console.log('Both files must be json');
    return null;
  }

  const object1 = parseJSON(filepath1);
  const object2 = parseJSON(filepath2);
  const differenceTree = getDifferenceTree(object1, object2);

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
