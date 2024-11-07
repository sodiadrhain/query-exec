import { SortOrder } from "mongoose";

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
  export interface IPaginationOptions {
    page?: number;
    limit?: number;
    q?: string;
    query?: object | Record<string, object>;
    modelName?: string;
    projections?: object;
    sort?: string | { [key: string]: SortOrder | { $meta: "textScore" } } | undefined | null | any;
    populate?: string | string[] | any | { path: string | string[]; select: object }[];
  }
  