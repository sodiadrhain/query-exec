/**
 *
 * @param pages
 * @param page
 * @param perPage
 *
 * @returns
 */
export const paginate = (
  page = 1,
  perPage = 10,
  pages: number
): {
  current: number;
  prev: number | null;
  next: number | null;
  pages: number;
  total: number;
} => {
  const sumOfPages = Math.ceil(pages / perPage);
  return {
    current: page ?? 1,
    prev: page > 1 ? page - 1 : null,
    next: page < sumOfPages ? page + 1 : null,
    pages: sumOfPages,
    total: pages,
  };
};
