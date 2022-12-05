const stringify = (value) => {
  if (value === null) {
    return null;
  }
  const type = typeof value;
  switch (type) {
    case 'object': {
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

const makePlain = (children, path) => {
  const lines = children
    .map((child) => {
      const { type, name } = child;
      const currentPath = getPath([path, name]);

      switch (type) {
        case 'unchanged': {
          return null;
        }
        case 'added': {
          return `Property '${currentPath}' was added with value: ${stringify(child.value)}`;
        }
        case 'removed': {
          return `Property '${currentPath}' was removed`;
        }
        case 'changed': {
          return `Property '${currentPath}' was updated. From ${stringify(child.value)} to ${stringify(child.value2)}`;
        }
        case 'nested': {
          return makePlain(child.children, currentPath);
        }
        default: {
          throw Error('Incorrect data');
        }
      }
    })
    .filter((child) => child !== null);
  return [...lines].join('\n');
};

const makePlainDiff = (data) => {
  const iter = (currentNode, path) => {
    const { children } = currentNode;
    const result = makePlain(children, path);
    return result;
  };
  return iter(data, []);
};

export default makePlainDiff;
