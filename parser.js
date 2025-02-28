import fs from 'fs';
import path from 'path';

const parseFile = (filepath1, filepath2) => {
  const path1 = path.resolve(process.cwd(), filepath1);
  const path2 = path.resolve(process.cwd(), filepath2);

  console.log('Пути к файлам:', path1, path2);

  const read1 = fs.readFileSync(path1, { encoding: 'utf-8' });
  const read2 = fs.readFileSync(path2, { encoding: 'utf-8' });

  const data1 = JSON.parse(read1);
  const data2 = JSON.parse(read2);

  return { data1, data2 };
};

export default parseFile;
