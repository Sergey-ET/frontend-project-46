import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';
import formatter from './formatters/index.js';

const makeConfig = (pathToFile) => {
  const type = path.extname(pathToFile);
  const data = fs.readFileSync(path.resolve(pathToFile));

  return { type, data };
};

const diff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  return keys.sort().map((key) => {
    if (!_.has(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, type: 'nested', children: diff(obj1[key], obj2[key]) };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        key, type: 'updated', valueBefore: obj1[key], valueAfter: obj2[key],
      };
    }
    return { key, type: 'unchanged', value: obj1[key] };
  });
};

const genDiff = (pathToFileBefore, pathToFileAfter, format = 'stylish') => {
  const beforeConfig = makeConfig(pathToFileBefore);
  const afterConfig = makeConfig(pathToFileAfter);

  const parsedConfigBefore = parse(beforeConfig.type, beforeConfig.data);
  const parsedConfigAfter = parse(afterConfig.type, afterConfig.data);

  const differences = diff(parsedConfigBefore, parsedConfigAfter);

  return formatter(differences, format);
};

export default genDiff;
