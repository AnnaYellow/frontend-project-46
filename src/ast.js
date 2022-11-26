import _ from 'lodash';
import getValue from './utils.js';

const getDifferenceTree = (data1, data2) => {
  const getChildren = (object1, object2) => {
    const keys = _.sortBy(_.union(_.keys(object1), _.keys(object2)));

    const children = keys.map((key) => {
      const initialProperty = getValue(object1, key);
      const currentProperty = getValue(object2, key);

      if (Object.hasOwn(object1, key) && Object.hasOwn(object2, key)) {
        if (initialProperty === currentProperty) {
          return {
            name: key,
            value: initialProperty,
            status: 'unchanged',
          };
        }
        if (_.isObject(initialProperty) && _.isObject(currentProperty)) {
          return {
            name: key,
            children: getChildren(initialProperty, currentProperty),
            status: 'node',
          };
        }
        return {
          name: key,
          value: initialProperty,
          newValue: currentProperty,
          status: 'changed',
        };
      }
      if (!Object.hasOwn(object1, key) && Object.hasOwn(object2, key)) {
        return {
          name: key,
          value: currentProperty,
          status: 'added',
        };
      }
      return {
        name: key,
        value: initialProperty,
        status: 'deleted',
      };
    });
    return children;
  };
  return {
    name: 'tree',
    children: getChildren(data1, data2),
  };
};
export default getDifferenceTree;
