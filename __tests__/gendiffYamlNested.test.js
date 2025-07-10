import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const path1 = path.join(__dirname, '../__fixtures__/file1.yml');
const path2 = path.join(__dirname, '../__fixtures__/file2.yml');

const expected = `{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
        setting6: {
            key: value
            doge: {
              - wow:
              + wow: so much
            }
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const normalize = (str) => str.split('\n').map((line) => line.trim()).join('\n');

test('gendiff with nested YAML files', () => {
  const result = genDiff(path1, path2);
  expect(normalize(result)).toBe(normalize(expected));
});
