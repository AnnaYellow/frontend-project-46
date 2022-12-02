import _ from 'lodash';

const getChildren = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  const children = keys.map((key) => {
    const property1 = data1[key];
    const property2 = data2[key];

    if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      if (property1 === property2) {
        return {
          type: 'identical',
          name: key,
          value: property1,
        };
      }
      if (_.isObject(property1) && _.isObject(property2)) {
        return {
          type: 'nested',
          name: key,
          children: getChildren(property1, property2),
        };
      }
      return {
        type: 'different',
        name: key,
        value: property1,
        value2: property2,
      };
    }
    if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      return {
        type: 'only2',
        name: key,
        value: property2,
      };
    }
    return {
      type: 'only1',
      name: key,
      value: property1,
    };
  });
  return children;
};

const getDifferenceTree = (data1, data2) => ({
  type: 'root',
  children: getChildren(data1, data2),
});
export default getDifferenceTree;
