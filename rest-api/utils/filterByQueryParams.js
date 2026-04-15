export const filterByQueryParams = (collection, params) => {
  const keys = Object.keys(params);

  if (keys.length === 0) return collection;

  return collection.filter((item) =>
    keys.every((key) =>
      key in item && item[key] != null
        ? String(item[key]).toLowerCase() === String(params[key]).toLowerCase()
        : false,
    ),
  );
};
