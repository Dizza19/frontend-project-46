import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const sortDiffTree = (nodes) => {
  return nodes
    .map((node) => {
      if (node.children) {
        return { ...node, children: sortDiffTree(node.children) };
      }
      if (node.value && typeof node.value === 'object' && !Array.isArray(node.value)) {
        return { ...node, value: sortDiffTreeObject(node.value) };
      }
      return node;
    })
    .sort((a, b) => a.key.localeCompare(b.key));
};

const sortDiffTreeObject = (obj) => {
  return Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
      const value = obj[key];
      acc[key] = typeof value === 'object' && value !== null && !Array.isArray(value)
        ? sortDiffTreeObject(value)
        : value;
      return acc;
    }, {});
};

test('gendiff json format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = JSON.parse(readFile('expected_json.json'));

  const result = genDiff(file1, file2, 'json');
  const parsed = JSON.parse(result);

  expect(sortDiffTree(parsed)).toEqual(sortDiffTree(expected));
});

