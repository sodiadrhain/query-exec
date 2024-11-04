/**
 *
 * @param pages
 * @param page
 * @param perPage
 *
 * @returns
 */
export const paginate = (
    pages: number,
    page = 1,
    perPage = 10,
  ): {
    current: number;
    prev: number | null;
    next: number | null;
    pages: number;
    totalItems: number;
  } => {
    const sumOfPages = Math.ceil(pages / perPage);
    return {
      current: page ?? 1,
      prev: page > 1 ? page - 1 : null,
      next: page < sumOfPages ? page + 1 : null,
      pages: sumOfPages,
      totalItems: pages,
    };
  };