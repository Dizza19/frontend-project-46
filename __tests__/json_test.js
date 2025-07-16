import { test, expect } from '@jest/globals'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import genDiff from '../src/gendiff.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const getFixturePath = name => path.join(dirname, '..', '__fixtures__', name)
const readFile = name => fs.readFileSync(getFixturePath(name), 'utf-8')

const sortDiffTreeObject = obj => Object.keys(obj)
  .sort()
  .reduce((acc, key) => {
    const value = obj[key]
    acc[key] = typeof value === 'object' && value !== null && !Array.isArray(value)
      ? sortDiffTreeObject(value)
      : value
    return acc
  }, {})

const sortDiffTree = nodes => nodes
  .map((node) => {
    if (node.children) {
      return { ...node, children: sortDiffTree(node.children) }
    }
    if (node.value && typeof node.value === 'object' && !Array.isArray(node.value)) {
      return { ...node, value: sortDiffTreeObject(node.value) }
    }
    return node
  })
  .sort((a, b) => a.key.localeCompare(b.key))

test('gendiff json format', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')
  const expected = JSON.parse(readFile('expected_json.json'))

  const result = genDiff(file1, file2, 'json')
  const parsed = JSON.parse(result)

  expect(sortDiffTree(parsed)).toEqual(sortDiffTree(expected))
})
