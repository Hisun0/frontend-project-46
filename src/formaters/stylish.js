import _ from 'lodash';
import getParseFile from '../parsers/parse.js';
import { getUnionKeys } from '../utils.js';

const labels = {
  deleted: '- ',
  added: '+ ',
  nested: '> ',
  unchanged: '* ',
};

const obj1 = getParseFile('__fixtures__/file1.json');
const obj2 = getParseFile('__fixtures__/file2.json');

const toDiffTree = (data1, data2) => {
  const unionKeys = getUnionKeys(data1, data2);
  const result = unionKeys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, children: toDiffTree(data1[key], data2[key]), status: 'nested' };
    }

    if (!Object.hasOwn(data2, key)) {
      return ({ key, value: data1[key], status: 'deleted' });
    } if (!Object.hasOwn(data1, key)) {
      return ({ key, value: data2[key], status: 'added' });
    } if (data1[key] !== data2[key]) {
      return ({ key, value: data1[key], status: 'changed' });
    }
    return ({ key, value: data1[key], status: 'unchanged' });
  });
  return result;
};

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
