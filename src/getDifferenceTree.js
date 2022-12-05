import _ from 'lodash';

const buildDifference = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  const children = keys.map((key) => {
    if (!_.has(data1, key) && _.has(data2, key)) {
      return {
        type: 'added',
        name: key,
        value: data2[key],
      };
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      return {
        type: 'removed',
        name: key,
        value: data1[key],
      };
    }
    if (data1[key] === data2[key]) {
      return {
        type: 'unchanged',
        name: key,
        value: data1[key],
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        type: 'nested',
        name: key,
        children: buildDifference(data1[key], data2[key]),
      };
    }
    return {
      type: 'changed',
      name: key,
      value: data1[key],
      value2: data2[key],
    };
  });
  return children;
};

const getDifferenceTree = (data1, data2) => ({
  type: 'root',
  children: buildDifference(data1, data2),
});
export default getDifferenceTree;
