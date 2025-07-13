import parseFile from './parser';
import buildDiff from './buildDiff';
import getFormatter from './formatters/index';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const { data1, data2 } = parseFile(filepath1, filepath2);
  const diffTree = buildDiff(data1, data2);

  const formatDiff = getFormatter(format);
  return formatDiff(diffTree);
};

export default genDiff;
