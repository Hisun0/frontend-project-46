import _ from 'lodash';

const getUnionKeys = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2);

  return unionKeys.sort();
};

const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (el, depth) => {
    if (!_.isObject(el)) return `${el}`;

    const indentSize = depth * spacesCount;
    const indent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = Object.entries(el).map(([key, val]) => `${indent}${key}: ${iter(val, depth + 1)}`);
    const result = ['{', ...lines, `${bracketIndent}}`].join('\n');
    return result;
  };
  return iter(value, 1);
};

export {
  getUnionKeys,
  stringify,
};
