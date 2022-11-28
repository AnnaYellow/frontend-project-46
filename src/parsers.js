import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parser = (filepath) => {
  const normalizedFilepath = path.resolve(process.cwd(), filepath);
  const format = path.extname(normalizedFilepath);
  const file = fs.readFileSync(normalizedFilepath, 'utf-8');

  const parse = (formatOfFile, readFile) => {
    if (formatOfFile === '.json') {
      return JSON.parse(readFile);
    }
    if ((formatOfFile === '.yml') || (format === '.yaml')) {
      return yaml.load(readFile);
    }
    throw Error('Wrong file format. Both files must be json or yaml');
  };

  return parse(format, file);
};

export default parser;
