import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import buildDiff from './buildDiff.js'
import getFormatter from './formatters/index.js'

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data)
    case 'yml':
    case 'yaml':
      return yaml.load(data)
    default:
      throw new Error(`Unsupported file extension: ${format}`)
  }
}

const parseFile = (filepath1, filepath2) => {
  const raw1 = fs.readFileSync(filepath1, 'utf-8')
  const raw2 = fs.readFileSync(filepath2, 'utf-8')

  const format1 = path.extname(filepath1).slice(1)
  const format2 = path.extname(filepath2).slice(1)

  const data1 = parse(raw1, format1)
  const data2 = parse(raw2, format2)

  return { data1, data2 }
}

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const { data1, data2 } = parseFile(filepath1, filepath2)
  const diffTree = buildDiff(data1, data2)

  const formatDiff = getFormatter(format)
  return formatDiff(diffTree)
}

export default genDiff
