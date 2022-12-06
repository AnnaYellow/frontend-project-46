import makeStylishDiff from './stylish.js';
import makePlainDiff from './plain.js';

const makeDiff = (data, format) => {
  switch (format) {
    case 'stylish': {
      return makeStylishDiff(data);
    }
    case 'plain': {
      return makePlainDiff(data);
    }
    case 'json': {
      return JSON.stringify(data);
    }
    default: {
      throw Error(`Incorrect format: ${format}`);
    }
  }
};

export default makeDiff;
