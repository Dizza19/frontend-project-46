import fs from 'fs';
import path from 'path';
import parse from './parser.js';

const parseFile = (filepath1, filepath2) => {
  const raw1 = fs.readFileSync(filepath1, 'utf-8');
  const raw2 = fs.readFileSync(filepath2, 'utf-8');

  const format1 = path.extname(filepath1).slice(1);
  const format2 = path.extname(filepath2).slice(1);

  const data1 = parse(raw1, format1);
  const data2 = parse(raw2, format2);

  return { data1, data2 };
};

export default parseFile;
