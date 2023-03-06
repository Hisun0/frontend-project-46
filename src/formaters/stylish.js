import getParseFile from '../parsers/parse.js';
import { toDiffTree, stringify } from '../utils.js';

const labels = {
  deleted: '- ',
  added: '+ ',
  nested: '  ',
  unchanged: '  ',
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
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = el.flatMap(({ key, value, status }) => {
      if (status === 'nested') {
        return `${indent}${labels.nested}${key}: ${iter(value, depth + 2)}`;
      } else if (status === 'deleted') {
        return `${indent}${labels.deleted}${key}: ${stringify(value, depth + 2)}`;
      } else if (status === 'added') {
        return `${indent}${labels.added}${key}: ${stringify(value, depth + 2)}`;
      } else if (status === 'changed') {
        return `${indent}${labels.deleted}${key}: ${stringify(value.oldValue, depth + 2)}\n${indent}${labels.added}${key}: ${stringify(value.newValue, depth + 2)}`;
      } else if (status === 'unchanged') {
        return `${indent}${labels.unchanged}${key}: ${stringify(value, depth + 2)}`;
      }
    });
    const result = ['{', ...lines, `${bracketIndent}}`].join('\n');
    return result;
  };
  return iter(tree, 1);
};
const tree = toDiffTree(obj1, obj2);
//console.log(JSON.stringify(tree, ' ', 2));
console.log(stylish(tree));
export default stylish;
