export const filterByUrlSlug = (req, collection, fieldName) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);
  const slug = pathname.split("/").filter(Boolean).pop()?.toLowerCase();

  if (!slug) return [];

  return collection.filter(
    (destination) => destination[fieldName]?.toLowerCase() === slug,
  );
};
