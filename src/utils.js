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

export {
  getUnionKeys,
  stringify,
  toDiffTree,
};
