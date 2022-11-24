import fs from 'fs';
import path from 'path';

const normalizeFilepath = (filepath) => path.resolve(process.cwd(), filepath);

const getFileContent = (filepath) => fs.readFileSync(filepath);

const parseJSON = (filepath) => {
  const fileContent = getFileContent(normalizeFilepath(filepath));
  const ObjectJSON = JSON.parse(fileContent);
  return ObjectJSON;
};

export default parseJSON;
