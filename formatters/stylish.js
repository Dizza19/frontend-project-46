const makeIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - 2);
const makeBracketIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat((depth - 1) * spacesCount);

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const entries = Object.entries(value);
  const lines = entries.map(
    ([key, val]) => `${makeIndent(depth)}  ${key}: ${stringify(val, depth + 1)}`
  );

  return ['{', ...lines, `${makeBracketIndent(depth)}}`].join('\n');
};

const stylish = (tree, depth = 1) => {
  const lines = tree.map((node) => {
    const {
      key, type, value, oldValue, newValue, children,
    } = node;

    switch (type) {
      case 'added':
        return `${makeIndent(depth)}+ ${key}: ${stringify(value, depth + 1)}`;
      case 'removed':
        return `${makeIndent(depth)}- ${key}: ${stringify(value, depth + 1)}`;
      case 'unchanged':
        return `${makeIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`;
      case 'modified':
        return [
          `${makeIndent(depth)}- ${key}: ${stringify(oldValue, depth + 1)}`,
          `${makeIndent(depth)}+ ${key}: ${stringify(newValue, depth + 1)}`,
        ].join('\n');
      case 'nested':
        return `${makeIndent(depth)}  ${key}: ${stylish(children, depth + 1)}`;
      default:
        throw new Error(`Неизвестный тип: ${type}`);
    }
  });

  return ['{', ...lines, `${makeBracketIndent(depth)}}`].join('\n');
};

export default stylish;
