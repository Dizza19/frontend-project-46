import fs from 'fs';
import path from 'path';
import gendiff from '../gendiff.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const path1 = path.join(__dirname, '../__fixtures__/file1.json');
const path2 = path.join(__dirname, '../__fixtures__/file2.json');


const read1 = JSON.parse(fs.readFileSync(path1, 'utf-8'));
const read2 = JSON.parse(fs.readFileSync(path2, 'utf-8'));


const keys1 = Object.keys(read1);
const keys2 = Object.keys(read2);

const normalize = (str) => str.split('\n').map((line) => line.trim()).join('\n');

test('Вывод разницы между файлами', () => { 
const result = gendiff(read1 , read2);
const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
expect(normalize(result)).toBe(normalize(expected));
});



		


