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

  const handleDiff = (acc, key, value) => {
    if (_.isObject(dataBefore[key]) && _.isObject(dataAfter[key])) {
      acc[key] = diff(dataBefore[key], dataAfter[key]);
    } else if (dataBefore[key] !== dataAfter[key]) {
      acc[`- ${key}`] = dataBefore[key];
      acc[`+ ${key}`] = dataAfter[key];
    } else {
      acc[key] = value;
    }
  };

  return keys.reduce((acc, key) => {
    if (!_.has(dataAfter, key)) {
      acc[`- ${key}`] = dataBefore[key];
    } else if (!_.has(dataBefore, key)) {
      acc[`+ ${key}`] = dataAfter[key];
    } else {
      handleDiff(acc, key, dataBefore[key]);
    }
    return acc;
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
