import _ from 'lodash';

const stylish = (data, depth = 0, indent = 4) => {
  const calculateIndentation = (key) => {
    const additionalIndent = (key.startsWith('- ') || key.startsWith('+ ')) ? 2 : 4;
    const indentationDepth = (depth * indent) + additionalIndent;
    return ' '.repeat(indentationDepth);
  };

  const formatValue = (value) => {
    if (_.isObject(value)) {
      return `: {\n${stylish(value, depth + 1, indent)}\n${' '.repeat((depth + 1) * indent)}}`;
    }
    return value !== '' ? `: ${value}` : ':';
  };

  if (_.isObject(data)) {
    const entries = Object.entries(data);
    const result = entries.map(([key, value]) => {
      const indentation = calculateIndentation(key);
      const formattedValue = formatValue(value, key);

      return `${indentation}${key}${formattedValue}`;
    });

    const resultString = result.join('\n');
    return depth === 0 ? `{\n${resultString}\n}` : resultString;
  }
  return `${data}`;
};

export default stylish;
