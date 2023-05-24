const printValue = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  const indent = ' '.repeat(depth * 4 - 2);
  const lines = Object
    .keys(value)
    .map((key) => `${indent}  ${key}: ${printValue(value[key], depth + 1)}`);

  return `{\n${lines.join('\n')}\n${indent.slice(0, -2)}}`;
};

const generateLine = (indent, symbol, key, value, depth) => `${indent.slice(0, -2)}${symbol} ${key}:${value === '' ? '' : ' '}${printValue(value, depth + 1)}`;

const stylish = (diffs, depth = 1) => {
  const indent = ' '.repeat(depth * 4 - 2);
  const currentIndent = `${indent}  `;
  const lines = diffs.map((diff) => {
    switch (diff.type) {
      case 'deleted':
      case 'added':
        return generateLine(currentIndent, diff.type === 'deleted' ? '-' : '+', diff.key, diff.value, depth);
      case 'updated':
        return `${generateLine(currentIndent, '-', diff.key, diff.valueBefore, depth)}\n${generateLine(currentIndent, '+', diff.key, diff.valueAfter, depth)}`;
      case 'nested':
        return `${currentIndent}${diff.key}: ${stylish(diff.children, depth + 1)}`;
      case 'unchanged':
        return `${currentIndent}${diff.key}:${diff.value === '' ? '' : ' '}${printValue(diff.value, depth + 1)}`;
      default:
        return '';
    }
  });
  return `{\n${lines.join('\n')}\n${indent.slice(0, -2)}}`;
};

export default stylish;
