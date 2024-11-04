export interface IPagination<T> {
    data: T[];
    meta: {
      pages: number;
      current: number;
      prev: number | null;
      next: number | null;
      total: number;
    };
  }
  
  export interface IPaginationOptions<T> {
    page?: number;
    limit?: number;
    order?: string;
    query?: object | Record<string, T>;
    q?: string;
  }