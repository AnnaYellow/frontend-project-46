import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const normalizeFilepath = (filepath) => path.resolve(process.cwd(), filepath);

const convertJsonFileToObject = (filepath) => {
    const fileContent = fs.readFileSync(filepath);
    const object = JSON.parse(fileContent);
    return object;
}

const genDiff = (filepath1, filepath2) => {
    if (!filepath1.endsWith('json') || !filepath2.endsWith('json')) {
        console.log('Both files must be JSON')
        return null;
    }
    const normalizedFilepath1 = normalizeFilepath(filepath1);
    const normalizedFilepath2 = normalizeFilepath(filepath2);
    const object1 = convertJsonFileToObject(normalizedFilepath1);
    const object2 = convertJsonFileToObject(normalizedFilepath2);
    const keys = [...Object.keys(object1), ...Object.keys(object2)];
    const sortedKeys = _.sortBy(keys);
    const uniqKeys = _.sortedUniq(sortedKeys);
    const difference = uniqKeys.map((key) => {
        if (Object.hasOwn(object1, key) && !Object.hasOwn(object2, key)) {
            key = `- ${key}: ${object1[key]}`;
            return key;
        }
        if (!Object.hasOwn(object1, key) && Object.hasOwn(object2, key)) {
            key = `+ ${key}: ${object2[key]}`;
            return key;
        }
        if (Object.hasOwn(object1, key) && Object.hasOwn(object2, key)) {
            if (object1[key] === object2[key]) {
                key = `  ${key}: ${object1[key]}`;
            } else {
                key = `- ${key}: ${object1[key]}\n+ ${key}: ${object2[key]}`;
            }
            return key;
        }
    })
    difference.unshift('{');
    difference.push('}');
    const result = difference.join('\n');
    console.log(result);
    return result;
};

export default genDiff;