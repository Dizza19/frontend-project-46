import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/index.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['file1.json', 'file2.json', 'stylish', 'expectedStylish.txt'],
  ['file1.yml', 'file2.yml', 'plain', 'expectedPlain.txt'],
  ['file1.json', 'file2.json', 'json', 'expectedJson.txt'],
])('genDiff %s %s with format %s', (file1, file2, format, expectedFile) => {
  const expected = readFile(expectedFile).trim();
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  expect(genDiff(filepath1, filepath2, format)).toBe(expected);
});

