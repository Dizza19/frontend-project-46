import parseFile from './parser.js';
import buildDiff from './buildDiff.js';
import stylish from './formatters/stylish.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const { data1, data2 } = parseFile(filepath1, filepath2);
  const diffTree = buildDiff(data1, data2);

  if (format === 'stylish') {
     return stylish(diffTree);
}

  throw new Error(`Неизвестный формат: ${format}`);
};

export default genDiff;
