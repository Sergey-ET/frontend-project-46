import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

const makeConfig = (pathToFile) => {
  const type = path.extname(pathToFile);
  const data = fs.readFileSync(path.resolve(pathToFile));

  return { type, data };
};

const genDiff = (pathToFileBefore, pathToFileAfter) => {
  const beforeConfig = makeConfig(pathToFileBefore);
  const afterConfig = makeConfig(pathToFileAfter);

  const parsedConfigBefore = parse(beforeConfig.type, beforeConfig.data);
  const parsedConfigAfter = parse(afterConfig.type, afterConfig.data);

  const keys = Object.keys({ ...parsedConfigBefore, ...parsedConfigAfter });
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.map((key) => {
    if (!_.has(parsedConfigAfter, key)) {
      return ` - ${key}: ${parsedConfigBefore[key]}`;
    }
    if (!_.has(parsedConfigBefore, key)) {
      return ` + ${key}: ${parsedConfigAfter[key]}`;
    }
    if (parsedConfigBefore[key] !== parsedConfigAfter[key]) {
      return ` - ${key}: ${parsedConfigBefore[key]}\n  + ${key}: ${parsedConfigAfter[key]}`;
    }

    return `   ${key}: ${parsedConfigBefore[key]}`;
  });

  return `{\n ${result.join('\n ')}\n}`;
};

export default genDiff;
