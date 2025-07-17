import formatStylish from './stylish.js'
import formatPlain from './plain.js'
import formatJson from './json.js'

export default (format) => {
  switch (format) {
    case 'stylish':
      return formatStylish
    case 'plain':
      return formatPlain
    case 'json':
      return formatJson
    default:
      throw new Error(`Unknown format: ${format}`)
  }
}
