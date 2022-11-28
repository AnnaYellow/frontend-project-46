import makeStylishDiff from './stylish.js';
import makePlainDiff from './plain.js';

const makeDiff = (data, formatName) => {
  const { format } = formatName;
  switch (format) {
    case 'stylish': {
      return makeStylishDiff(data);
    }
    case 'plain': {
      return makePlainDiff(data);
    }
    default: {
      throw Error('Uncorrect format');
    }
  }
};

export default makeDiff;
