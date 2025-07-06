import parseFile from './parser.js';
import compare from './compare.js';

const genDiff = (filepath1, filepath2) => {
  const { data1, data2 } = parseFile(filepath1, filepath2);
  return compare(data1, data2);
};

export default genDiff;
