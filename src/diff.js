import parse from './parsers/parse.js';
import { toDiffTree } from './utils.js';
import checkFormat from './formaters/index.js';

const genDiff = (filename1, filename2, format = 'stylish') => {
  const data1 = parse(filename1);
  const data2 = parse(filename2);
  const tree = toDiffTree(data1, data2);
  return checkFormat(tree, format);
};

export default genDiff;
