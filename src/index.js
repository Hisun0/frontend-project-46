import _ from 'lodash';
import getParseFile from './parsers/parse.js';

const getUnionKeys = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2);

  return unionKeys.sort();
};

const genDiff = (filename1, filename2) => {
  const data1 = getParseFile(filename1);
  const data2 = getParseFile(filename2);
  const unionKeys = getUnionKeys(data1, data2);

  const result = unionKeys.reduce((acc, currentValue) => {
    let difference = acc;
    if (!Object.hasOwn(data2, currentValue)) {
      difference += `  - ${currentValue}: ${data1[currentValue]}\n`;
    } else if (!Object.hasOwn(data1, currentValue)) {
      difference += `  + ${currentValue}: ${data2[currentValue]}\n`;
    } else if (data1[currentValue] !== data2[currentValue]) {
      difference += `  - ${currentValue}: ${data1[currentValue]}\n`;
      difference += `  + ${currentValue}: ${data2[currentValue]}\n`;
    } else {
      difference += `    ${currentValue}: ${data1[currentValue]}\n`;
    }
    return difference;
  }, '');
  return `{\n${result}}`;
};

export default genDiff;
