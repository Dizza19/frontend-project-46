import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const parse = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath)
  const ext = path.extname(fullPath)
  const raw = fs.readFileSync(fullPath, 'utf-8')

  if (ext === '.json') {
    return JSON.parse(raw)
  }

  if (ext === '.yaml' || ext === '.yml') {
    return yaml.load(raw)
  }

  throw new Error(`Неизвестный формат файла: ${ext}`)
}

const parseFile = (filepath1, filepath2) => {
  const data1 = parse(filepath1)
  const data2 = parse(filepath2)
  return { data1, data2 }
}

export default parseFile
