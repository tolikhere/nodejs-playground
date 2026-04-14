export const filterByQueryParams = (collection, params) => {
  const keys = Object.keys(params);

  if (keys.length === 0) return collection;

  return collection.filter((item) =>
    keys.every((key) =>
      key in item ? String(item[key]) === String(params[key]) : false,
    ),
  );
};
