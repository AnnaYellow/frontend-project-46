import _ from 'lodash';

const getDifferenceTree = (object1, object2) => {
  const keys = _.union(_.keys(object1), _.keys(object2));
  const sortedKeys = _.sortBy(keys);
  const differences = sortedKeys.map((key) => {
    if (!Object.hasOwn(object1, key) && Object.hasOwn(object2, key)) {
      return {
        name: key,
        value: object2[key],
        status: 'added',
      };
    }
    if (Object.hasOwn(object1, key) && !Object.hasOwn(object2, key)) {
      return {
        name: key,
        value: object1[key],
        status: 'deleted',
      };
    }
    if (Object.hasOwn(object1, key) && Object.hasOwn(object2, key)) {
      if (object1[key] === object2[key]) {
        return {
          name: key,
          value: object1[key],
          status: 'unchanged',
        };
      }
    }
    return {
      name: key,
      value: object1[key],
      newValue: object2[key],
      status: 'changed',
    };
  });
  return differences;
};
export default getDifferenceTree;
