const buildDiff = (obj1, obj2) => {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])];
  const diff = keys.map((key) => {
    if (!Object.prototype.hasOwnProperty.call(obj2,key)) {
      return { key, type: 'removed', value: obj1[key] };
    }
    if (!Object.prototype.hasOwnProperty.call(obj1,key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object' && obj1[key] !== null && obj2[key] !== null) {
      return { key, type: 'nested', children: buildDiff(obj1[key], obj2[key]) };
    }
    if (obj1[key] !== obj2[key]) {
      return { key, type: 'modified', oldValue: obj1[key], newValue: obj2[key] };
    }
    return { key, type: 'unchanged', value: obj1[key] };
  });

  return diff;
};

export default buildDiff;
