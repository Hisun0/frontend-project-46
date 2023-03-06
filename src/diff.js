import _ from 'lodash';
import getParseFile from './parsers/parse.js';
import toDiffTree from './formaters/stylish.js';

const genDiff = (filename1, filename2) => {
  const data1 = getParseFile(filename1);
  const data2 = getParseFile(filename2);

  return toDiffTree(data1, data2);
};

console.log(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json'));

export default genDiff;
