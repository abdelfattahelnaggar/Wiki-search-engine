const unique = (list, isEqual = (a, b) => a?.title === b?.title) => {
  let current;
  return (list ?? []).filter((item) => {
    if (!isEqual(current, item)) {
      current = item;
      return true;
    }
  });
};

module.exports = unique;
