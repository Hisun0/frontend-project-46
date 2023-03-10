import _ from 'lodash';

const isComplexValue = (value) => _.isObject(value);

const getPlainValue = (value) => {
  if (value === true || value === null || value === false) return `${value}`;
  if (isComplexValue(value)) return '[complex value]';
  return `'${value}'`;
};

const plain = (tree) => {
  let keys = [];
  const iter = (el, depth) => {
    if (depth === 1) keys = [];
    const lines = el.flatMap(({ key, value, status }) => {
      let str = '';
      if (status === 'nested') {
        keys.push(key);
        str += `${iter(value, depth + 1)}`;
        keys.pop();
      } if (status === 'deleted') {
        keys.push(key);
        str += `Property '${keys.join('.')}' was removed`;
        keys.pop();
      } if (status === 'added') {
        keys.push(key);
        str += `Property '${keys.join('.')}' was added with value: ${getPlainValue(value)}`;
        keys.pop();
      } if (status === 'changed') {
        keys.push(key);
        str += `Property '${keys.join('.')}' was updated. From ${getPlainValue(value.oldValue)} to ${getPlainValue(value.newValue)}`;
        keys.pop();
      } if (status === 'unchanged') {
        str = [];
      }
      return str;
    });
    return lines.join('\n');
  };
  return iter(tree, 1);
};

export default plain;
