import parseFile from './parser.js';
import compare from './compare.js';

export const genDiffData = (data1, data2) => compare(data1, data2);

const genDiff = (filepath1, filepath2) => {
  const { data1, data2 } = parseFile(filepath1, filepath2);
  return genDiffData(data1, data2);
};

export default genDiff;
