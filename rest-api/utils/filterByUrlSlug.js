export const filterByUrlSlug = (collection, fieldName, pathname) => {
  const slug = pathname.split("/").filter(Boolean).pop()?.toLowerCase();

  if (!slug) return [];

  return collection.filter(
    (destination) => destination[fieldName]?.toLowerCase() === slug,
  );
};
