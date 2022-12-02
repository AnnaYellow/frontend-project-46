import fs from 'fs';
import path from 'path';
import parse from './parse.js';

const getData = (filepath) => {
  const formatName = path.extname(filepath).slice(1);
  const readFile = fs.readFileSync(filepath, 'utf-8');
  const parsedData = parse(readFile, formatName);
  return parsedData;
};
export default getData;
