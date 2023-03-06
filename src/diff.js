import getParseFile from './parsers/parse.js';
import { toDiffTree } from './utils.js';
import stylish from './formaters/stylish.js';

const genDiff = (filename1, filename2) => {
  const data1 = getParseFile(filename1);
  const data2 = getParseFile(filename2);
  const tree = toDiffTree(data1, data2);

  return stylish(tree);
};

export default genDiff;
