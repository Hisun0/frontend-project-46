import _ from 'lodash';
import getParseFile from '../parsers/parse.js';
import { getUnionKeys, stringify } from '../utils.js';

const labels = {
  deleted: '- ',
  added: '+ ',
  nested: '> ',
  unchanged: '* '
};

const data1 = getParseFile('__fixtures__/file1.json');
const data2 = getParseFile('__fixtures__/file2.json');

const toDiffTree = (data1, data2) => {
  const unionKeys = getUnionKeys(data1, data2);
  const result = unionKeys.map((key) => { 
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, children: toDiffTree(data1[key], data2[key]), status: 'nested' }
    }

    if (!Object.hasOwn(data2, key)) {
      return ({ key, value: data1[key], status: 'deleted' });
    } else if (!Object.hasOwn(data1, key)) {
      return ({ key, value: data2[key], status: 'added' });
    } else if (data1[key] !== data2[key]) {
      return ({ key, value: data1[key], status: 'changed' });
    } else {
      return ({ key, value: data1[key], status: 'unchanged' });
    }
  });
  return result;
};


//console.log(toDiffTree(data1, data2));

const stylish = (tree) => {
    const spacesCount = 2;
    const replacer = ' ';
    const iter = (el, depth) => {   
      const indentSize = depth * spacesCount;
      const indent = replacer.repeat(indentSize);
      const bracketIndent = replacer.repeat(indentSize - spacesCount);
      

      const lines = el.flatMap(({ key, value, status }) => {
        if (status === 'nested') {
          depth += 1;
          return iter(value);
        } else if (status === 'deleted') {
          console.log('победа!')
          // return `${indent}${labels.deleted}${key}: ${value}`;
        }
      })
      return lines;
    }
    return iter(tree, 1)
};
const tree = toDiffTree(data1, data2);
console.log(stylish(tree));
export default toDiffTree;
