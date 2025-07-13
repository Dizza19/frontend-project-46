import formatStylish from './stylish';
import formatPlain from './plain';
import formatJson from './json';

export default (format) => {
  switch (format) {
    case 'stylish':
      return formatStylish;
    case 'plain':
      return formatPlain;
    case 'json':
      return formatJson;
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};
