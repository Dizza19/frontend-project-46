const convert = (val) => {
  if (val === null) return 'null'
  if (typeof val === 'object') return '[complex value]'
  if (typeof val === 'string') return `'${val}'`
  return String(val)
}

const formatPlain = (tree, path = '') => tree
  .flatMap((node) => {
    const fullPath = path ? `${path}.${node.key}` : node.key

    switch (node.type) {
      case 'added':
        return `Property '${fullPath}' was added with value: ${convert(node.value)}`
      case 'removed':
        return `Property '${fullPath}' was removed`
      case 'modified':
        return `Property '${fullPath}' was updated. From ${convert(node.oldValue)} to ${convert(node.newValue)}`
      case 'nested':
        return formatPlain(node.children, fullPath)
      default:
        return []
    }
  })
  .join('\n')

export default formatPlain
