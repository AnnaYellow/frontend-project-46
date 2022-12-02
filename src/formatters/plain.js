const valueToString = (value) => {
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

const getPath = (nodeNames) => nodeNames.flat().join('.');

const stringify = (children, path) => {
  const lines = children
    .filter((child) => child.type !== 'identical')
    .flatMap((child) => {
      const { type, name } = child;
      const currentPath = getPath([path, name]);
      const value = valueToString(child.value);
      const newValue = valueToString(child.value2);

      switch (type) {
        case 'only2': {
          return `Property '${currentPath}' was added with value: ${value}`;
        }
        case 'only1': {
          return `Property '${currentPath}' was removed`;
        }
        case 'different': {
          return `Property '${currentPath}' was updated. From ${value} to ${newValue}`;
        }
        case 'nested': {
          return stringify(child.children, currentPath);
        }
        default: {
          throw Error('Incorrect data');
        }
      }
    });
  return [...lines].join('\n');
};

const makePlainDiff = (data) => {
  const iter = (currentNode, path) => {
    const { children } = currentNode;
    const result = stringify(children, path);
    return result;
  };
  return iter(data, []);
};

export default makePlainDiff;
