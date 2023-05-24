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

const stylish = (diffs, depth = 1) => {
  const indent = ' '.repeat(depth * 4 - 2);
  const currentIndent = `${indent}  `;

  const lines = diffs.map((diff) => {
    let line;

    switch (diff.type) {
      case 'deleted':
        line = `${currentIndent.slice(0, -2)}- ${diff.key}:${diff.value === '' ? '' : ' '}${printValue(diff.value, depth + 1)}`;
        break;
      case 'added':
        line = `${currentIndent.slice(0, -2)}+ ${diff.key}:${diff.value === '' ? '' : ' '}${printValue(diff.value, depth + 1)}`;
        break;
      case 'updated':
        line = `${currentIndent.slice(0, -2)}- ${diff.key}:${diff.valueBefore === '' ? '' : ' '}${printValue(diff.valueBefore, depth + 1)}\n${currentIndent.slice(0, -2)}+ ${diff.key}:${diff.valueAfter === '' ? '' : ' '}${printValue(diff.valueAfter, depth + 1)}`;
        break;
      case 'nested':
        line = `${currentIndent}${diff.key}: ${stylish(diff.children, depth + 1)}`;
        break;
      case 'unchanged':
        line = `${currentIndent}${diff.key}:${diff.value === '' ? '' : ' '}${printValue(diff.value, depth + 1)}`;
        break;
      default:
        line = '';
    }
    return line;
  });
  return `{\n${lines.join('\n')}\n${indent.slice(0, -2)}}`;
};

export default stylish;
