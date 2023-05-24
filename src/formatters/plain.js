const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (typeof value === 'boolean' || value === null) {
    return `${value}`;
  }

  if (typeof value === 'object') {
    return '[complex value]';
  }

  return `${value}`;
};

const plain = (diffs, path = []) => {
  const lines = diffs.flatMap((diff) => {
    const fullPath = [...path, diff.key];
    switch (diff.type) {
      case 'deleted':
        return `Property '${fullPath.join('.')}' was removed`;
      case 'added':
        return `Property '${fullPath.join('.')}' was added with value: ${formatValue(diff.value)}`;
      case 'updated':
        return `Property '${fullPath.join('.')}' was updated. From ${formatValue(diff.valueBefore)} to ${formatValue(diff.valueAfter)}`;
      case 'nested':
        return plain(diff.children, fullPath);
      default:
        return [];
    }
  });
  return lines.join('\n');
};

export default plain;
