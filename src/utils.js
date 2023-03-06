import _ from 'lodash';

const getUnionKeys = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2);

  return unionKeys.sort();
};

const stringify = (value, depth) => {
  if (!_.isObject(value)) return `${value}`;

  const replacer = ' ';
  const spacesCount = 4;

  const indentSize = depth * spacesCount;
  const indent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);

  const lines = Object.entries(value).map(([key, val]) => `${indent}${key}: ${val}`);
  const result = ['{', ...lines, `${bracketIndent}}`].join('\n');
  return result;
};

const toDiffTree = (data1, data2) => {
  const unionKeys = getUnionKeys(data1, data2);
  const result = unionKeys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, value: toDiffTree(data1[key], data2[key]), status: 'nested' };
    }

    if (!Object.hasOwn(data2, key)) {
      return ({ key, value: data1[key], status: 'deleted' });
    } if (!Object.hasOwn(data1, key)) {
      return ({ key, value: data2[key], status: 'added' });
    } if (data1[key] !== data2[key]) {
      return ({ key, value: { oldValue: data1[key], newValue: data2[key] }, status: 'changed' });
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
