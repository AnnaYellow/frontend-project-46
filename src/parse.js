import yaml from 'js-yaml';

const parse = (data, format) => {
  if (format === 'json') {
    return JSON.parse(data);
  }
  if ((format === 'yml') || (format === 'yaml')) {
    return yaml.load(data);
  }
  throw Error(`Wrong file format: ${format}`);
};

export default parse;
