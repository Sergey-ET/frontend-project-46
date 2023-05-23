import _ from 'lodash';

const stylish = (data, depth = 0, indent = 4) => {
  if (_.isObject(data)) {
    const entries = Object.entries(data);
    const result = entries.map(([key, value]) => {
      const additionalIndent = (key.startsWith('- ') || key.startsWith('+ ')) ? 2 : 4;
      const indentationDepth = (depth * indent) + additionalIndent;
      const indentation = ' '.repeat(indentationDepth);

      let formattedValue;
      if (_.isObject(value)) {
        formattedValue = `: {\n${stylish(value, depth + 1)}\n${' '.repeat((depth + 1) * indent)}}`;
      } else {
        formattedValue = value !== '' ? `: ${value}` : ':';
      }

      return `${indentation}${key}${formattedValue}`;
    });

    const resultString = result.join('\n');
    return depth === 0 ? `{\n${resultString}\n}` : resultString;
  }
  return `${data}`;
};

export default stylish;
