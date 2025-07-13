import parseFile from './parser.js';
import buildDiff from './buildDiff.js';
import getFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const { data1, data2 } = parseFile(filepath1, filepath2);
  const diffTree = buildDiff(data1, data2);

  const formatDiff = getFormatter(format);
  return formatDiff(diffTree);
};

export default genDiff;
