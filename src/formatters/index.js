import _ from 'lodash';

import makeStylishDiff from './stylish.js';
import makePlainDiff from './plain.js';
import getValue from '../utils.js';

const makeDiff = (data, formatName) => {
  const getFormat = (declaredName) => {
    if (!_.isObject(declaredName)) {
      return declaredName;
    }
    return getValue(declaredName, 'format');
  };
  const format = getFormat(formatName);

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
