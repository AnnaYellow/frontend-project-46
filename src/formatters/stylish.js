import _ from 'lodash';

const indent = ' ';
const indentSize = 4;

const stringify = (key, value, depth, sign = ' ') => {
  const currentIndent = indent.repeat(indentSize * depth - 2);
  const result = `${currentIndent}${sign} ${key}: ${value}`;
  return result;
};

const buildStylishTree = (leaves, depth) => {
  const braceIndent = indent.repeat(indentSize * depth - indentSize);
  return [
    '{',
    ...leaves,
    `${braceIndent}}`,
  ].join('\n');
};

const makeStylish = (data, depth) => {
  if ((!_.isObject(data)) || (data === null)) {
    return data;
  }
  if (!_.has(data, 'type')) {
    const keys = _.keys(data);
    const lines = keys.map((key) => stringify(key, makeStylish(data[key], depth + 1), depth));
    return buildStylishTree(lines, depth);
  }
  const { type, name } = data;
  switch (type) {
    case 'added': {
      return stringify(name, makeStylish(data.value, depth + 1), depth, '+');
    }
    case 'removed': {
      return stringify(name, makeStylish(data.value, depth + 1), depth, '-');
    }
    case 'changed': {
      return [stringify(name, makeStylish(data.value, depth + 1), depth, '-'), stringify(name, makeStylish(data.value2, depth + 1), depth, '+')];
    }
    case 'unchanged': {
      return stringify(name, makeStylish(data.value, depth + 1), depth);
    }
    default: {
      throw Error('Uncorrect data');
    }
  }
};

const makeStylishDiff = (data) => {
  const iter = (currentValue, depth) => {
    const { type } = currentValue;
    if (type === 'nested') {
      const { children } = currentValue;
      const childrenToString = children.flatMap((child) => iter(child, depth + 1));
      return stringify(currentValue.name, buildStylishTree(childrenToString, depth + 1), depth);
    }
    if (type === 'root') {
      const { children } = currentValue;
      const result = children.flatMap((child) => iter(child, depth));
      return buildStylishTree(result, depth);
    }
    return makeStylish(currentValue, depth);
  };
  return iter(data, 1);
};

export default makeStylishDiff;
