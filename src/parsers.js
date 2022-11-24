import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

function parser(filepath) {
  const normalizedFilepath = path.resolve(process.cwd(), filepath);
  const format = path.extname(normalizedFilepath);
  const content = fs.readFileSync(normalizedFilepath, 'utf-8');

  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if ((format === '.yml') || (format === '.yaml')) {
    parse = yaml.load;
  } else {
    throw Error('Wrong file format. Both files must be json or yaml');
  }

  return parse(content);
}

export default parser;
