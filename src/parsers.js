import yaml from 'js-yaml';

const parse = (type, data) => {
  switch (type) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
      return yaml.load(data);
    case '.yml':
      return yaml.load(data);
    default:
      return JSON.parse(data);
  }
};

export default parse;
