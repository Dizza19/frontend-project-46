const isObject = (value) =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const buildDiff = (obj1, obj2) => {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort();

  const diff = keys.map((key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'removed', value: val1 };
    }

    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: val2 };
    }

    if (isObject(val1) && isObject(val2)) {
      const children = buildDiff(val1, val2);
      return {
        key,
        type: 'nested',
        children: children.sort((a, b) => a.key.localeCompare(b.key)),
      };
    }

    if (val1 !== val2) {
      return {
        key,
        type: 'modified',
        oldValue: val1,
        newValue: val2,
      };
    }

    return {
      key,
      type: 'unchanged',
      value: val1,
    };
  });

  return diff.sort((a, b) => a.key.localeCompare(b.key));
};

export default buildDiff;
