import _ from 'lodash';
import getValue from '../utils.js';

const makeStylishDiff = (data, indent = ' ', indentSize = 4) => {
  const iter = (currentValue, depth) => {
    const currentIndent = indent.repeat(indentSize * depth - 2);
    const braceIndent = indent.repeat(indentSize * depth - indentSize);
    if ((!_.isObject(currentValue)) || (currentValue === null)) {
      return currentValue;
    }
    if (!Object.hasOwn(currentValue, 'children')) {
      const planeObject = Object
        .entries(currentValue)
        .map(([key, val]) => `${currentIndent}  ${key}: ${iter(val, depth + 1)}`);
      return [
        '{',
        ...planeObject,
        `${braceIndent}}`,
      ].join('\n');
    }
    const { children } = currentValue;
    const objects = children
      .map((child) => {
        const { name, status } = child;
        const value = getValue(child, 'value');
        const newValue = getValue(child, 'newValue');
        switch (status) {
          case 'added': {
            return `${currentIndent}+ ${name}: ${iter(value, depth + 1)}`;
          }
          case 'removed': {
            return `${currentIndent}- ${name}: ${iter(value, depth + 1)}`;
          }
          case 'updated': {
            return `${currentIndent}- ${name}: ${iter(value, depth + 1)}\n${currentIndent}+ ${name}: ${iter(newValue, depth + 1)}`;
          }
          case 'unchanged': {
            return `${currentIndent}  ${name}: ${iter(value, depth + 1)}`;
          }
          case 'node': {
            return `${currentIndent}  ${name}: ${iter(child, depth + 1)}`;
          }
          default: {
            throw Error('Uncorrect data');
          }
        }
      });
    return [
      '{',
      ...objects,
      `${braceIndent}}`,
    ].join('\n');
  };
  return iter(data, 1);
};

export default makeStylishDiff;
