import getValue from '../utils.js';

const makePlainDiff = (data) => {
  const iter = (currentProperty, path) => {
    const { children } = currentProperty;
    const lines = children
      .filter((child) => child.status !== 'unchanged')
      .flatMap((child) => {
        const { name, status } = child;
        const currentPath = [path, name].flat().join('.');
        const valueToPrint = (value) => {
          if (value === null) {
            return null;
          }
          const type = typeof value;
          switch (type) {
            case 'object': {
              return '[complex value]';
            }
            case 'array': {
              return '[complex value]';
            }
            case 'string': {
              return `'${value}'`;
            }
            default: {
              return value;
            }
          }
        };
        const value = valueToPrint(getValue(child, 'value'));
        const newValue = valueToPrint(getValue(child, 'newValue'));

        switch (status) {
          case 'added': {
            return `Property '${currentPath}' was added with value: ${value}`;
          }
          case 'removed': {
            return `Property '${currentPath}' was removed`;
          }
          case 'updated': {
            return `Property '${currentPath}' was updated. From ${value} to ${newValue}`;
          }
          case 'node': {
            return iter(child, currentPath);
          }
          default: {
            throw Error('Uncorrect data');
          }
        }
      });
    return [...lines].join('\n');
  };
  return iter(data, []);
};
export default makePlainDiff;
