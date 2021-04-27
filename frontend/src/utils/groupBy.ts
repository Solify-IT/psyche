const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) => {
  if (list) {
    return list.reduce(
      (previous, currentItem) => {
        const group = getKey(currentItem);
        // eslint-disable-next-line no-param-reassign
        if (!previous[group]) previous[group] = [];
        previous[group].push(currentItem);
        return previous;
      }, {} as Record<K, T[]>,
    );
  }
  return null;
};
export default groupBy;
