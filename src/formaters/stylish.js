import { stringify } from '../utils.js';

const labels = {
  deleted: '- ',
  added: '+ ',
  nested: '  ',
  unchanged: '  ',
};

const stylish = (tree) => {
  const spacesCount = 4;
  const replacer = ' ';
  const iter = (el, depth) => {
    const indentSize = depth * spacesCount;
    const indent = replacer.repeat(indentSize - 2);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = el.map(({ key, value, status }) => {
      if (status === 'nested') {
        return `${indent}${labels.nested}${key}: ${iter(value, depth + 1)}`;
      } if (status === 'deleted') {
        return `${indent}${labels.deleted}${key}: ${stringify(value, depth + 1)}`;
      } if (status === 'added') {
        return `${indent}${labels.added}${key}: ${stringify(value, depth + 1)}`;
      } if (status === 'changed') {
        return `${indent}${labels.deleted}${key}: ${stringify(value.oldValue, depth + 1)}\n${indent}${labels.added}${key}: ${stringify(value.newValue, depth + 1)}`;
      } if (status === 'unchanged') {
        return `${indent}${labels.unchanged}${key}: ${stringify(value, depth + 1)}`;
      }
      return new Error('Something went wrong.. Try again!');
    });
    const result = ['{', ...lines, `${bracketIndent}}`].join('\n');
    return result;
  };
  return iter(tree, 1);
};

export default stylish;
