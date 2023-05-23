import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';
import stylish from './formatters/stylish.js';

const makeConfig = (pathToFile) => {
  const type = path.extname(pathToFile);
  const data = fs.readFileSync(path.resolve(pathToFile));

  return { type, data };
};

const diff = (dataBefore, dataAfter) => {
  const keys = _.sortBy(_.union(_.keys(dataBefore), _.keys(dataAfter)));
  return keys.reduce((acc, key) => {
    if (!_.has(dataAfter, key)) {
      return { ...acc, [`- ${key}`]: dataBefore[key] };
    }
    if (!_.has(dataBefore, key)) {
      return { ...acc, [`+ ${key}`]: dataAfter[key] };
    }
    if (_.isObject(dataBefore[key]) && _.isObject(dataAfter[key])) {
      return { ...acc, [key]: diff(dataBefore[key], dataAfter[key]) };
    }
    if (dataBefore[key] !== dataAfter[key]) {
      return { ...acc, [`- ${key}`]: dataBefore[key], [`+ ${key}`]: dataAfter[key] };
    }
    return { ...acc, [key]: dataBefore[key] };
  }, {});
};

const genDiff = (pathToFileBefore, pathToFileAfter, format = 'stylish') => {
  const beforeConfig = makeConfig(pathToFileBefore);
  const afterConfig = makeConfig(pathToFileAfter);

  const parsedConfigBefore = parse(beforeConfig.type, beforeConfig.data);
  const parsedConfigAfter = parse(afterConfig.type, afterConfig.data);

  const differences = diff(parsedConfigBefore, parsedConfigAfter);

  let formatter;
  switch (format) {
    default:
      formatter = stylish;
      break;
  }

  return formatter(differences);
};

export default genDiff;
