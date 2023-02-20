import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const getAbsolutePath = (filename) => path.resolve(process.cwd(), filename);

const getFileExtension = (filename) => path.extname(filename);

const getJSONFromFile = (filePath) => {
  const absolutePath = getAbsolutePath(filePath);
  const data = JSON.parse(fs.readFileSync(absolutePath));

  return data;
};

const getYamlFromFile = (filePath) => {
  const absolutePath = getAbsolutePath(filePath);
  const data = yaml.load(fs.readFileSync(absolutePath));

  return data;
};

const getParseFile = (filename) => {
  const extension = getFileExtension(filename);
  if (extension === '.yaml' || extension === '.yml') {
    return getYamlFromFile(filename);
  }
  return getJSONFromFile(filename);
};

export default getParseFile;
