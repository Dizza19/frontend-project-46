import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../gendiff.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const getFixturePath = (name) => path.join(dirname, '..', '__fixtures__', name);
const readFile = (name) => fs.readFileSync(getFixturePath(name), 'utf-8');

const sortObject = (obj) => {
  if (Array.isArray(obj)) return obj.map(sortObject);
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, val]) => [key, sortObject(val)]),
    );
  }
  return obj;
};

test('gendiff with nested YAML files', () => {
  const path1 = getFixturePath('file1.yml');
  const path2 = getFixturePath('file2.yml');
  const expected = JSON.parse(readFile('expected_yaml.json'));

  const result = genDiff(path1, path2, 'json');
  const parsed = JSON.parse(result);

  expect(sortObject(parsed)).toEqual(sortObject(expected));
});
