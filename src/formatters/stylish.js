import _ from 'lodash';
import { indent, indentSize } from '../constants.js';

const makeStylishDiff = (data) => {
  const iter = (currentValue, depth) => {
    const currentIndent = indent.repeat(indentSize * depth - 2);
    const braceIndent = indent.repeat(indentSize * depth - indentSize);
    if ((!_.isObject(currentValue)) || (currentValue === null)) {
      return currentValue;
    }
    if (!Object.hasOwn(currentValue, 'children')) {
      const plainObject = Object
        .entries(currentValue)
        .map(([key, val]) => `${currentIndent}  ${key}: ${iter(val, depth + 1)}`);
      return [
        '{',
        ...plainObject,
        `${braceIndent}}`,
      ].join('\n');
    }
    const { children } = currentValue;
    const objects = children
      .map((child) => {
        const { name, type } = child;
        switch (type) {
          case 'only2': {
            return `${currentIndent}+ ${name}: ${iter(child.value, depth + 1)}`;
          }
          case 'only1': {
            return `${currentIndent}- ${name}: ${iter(child.value, depth + 1)}`;
          }
          case 'different': {
            return `${currentIndent}- ${name}: ${iter(child.value, depth + 1)}\n${currentIndent}+ ${name}: ${iter(child.value2, depth + 1)}`;
          }
          case 'identical': {
            return `${currentIndent}  ${name}: ${iter(child.value, depth + 1)}`;
          }
          case 'nested': {
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
