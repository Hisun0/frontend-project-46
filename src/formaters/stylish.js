import getParseFile from '../parsers/parse.js';
import { toDiffTree } from '../utils.js';

const labels = {
  deleted: '- ',
  added: '+ ',
  nested: '> ',
  unchanged: '* ',
};

const obj1 = getParseFile('__fixtures__/file1.json');
const obj2 = getParseFile('__fixtures__/file2.json');

// console.log(toDiffTree(data1, data2));

const stylish = (tree) => {
  const spacesCount = 2;
  const replacer = ' ';
  const iter = (el, depth) => {
    const indentSize = depth * spacesCount;
    const indent = replacer.repeat(indentSize);
    // const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = el.flatMap(({ key, value, status }) => {
      let str = '';
      if (status === 'nested') {
        return iter(value);
      } if (status === 'deleted') {
        console.log('победа!');
        str += `${indent}${labels.deleted}${key}: ${value}`;
      }
      return str;
    });
    return lines;
  };
  return iter(tree, 1);
};
const tree = toDiffTree(obj1, obj2);
console.log(stylish(tree));
export default toDiffTree;
