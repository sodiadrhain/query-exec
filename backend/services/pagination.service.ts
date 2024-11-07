import { IPagination, IPaginationOptions } from "../interfaces";
import { paginate } from "../utils";
import { Model } from "mongoose";

export default class PaginationService<T> {
  constructor(model: Model<T>) {
    this.model = model;
  }
  model: Model<T>;

  /**
   * parse query
   * @param  {string} parameters
   * @return {object}
   */
  static extractQuery = (parameters: object | any, fields: string[] = []): object => {
    if (parameters == null) return null;

    const query: Record<string, unknown> = {};
    for (const element in parameters) {
      if (fields.includes(element)) {
        const val: any = parameters[element];

        query[element] = val;
      }
    }
    return query;
  };

  /**
   *
   * @param {IPaginationOptions}  options
   * @param {string[]}  keys - keys to extract from request query parameter
   */
  async paginate<T>(options: IPaginationOptions, keys: string[]): Promise<IPagination<T>> {
    const {
      page,
      limit,
      q,
      projections,
      // sort,
      //   query,
      populate,
    } = options;

    const query: Record<string, unknown> = {
      ...options.query,
      ...PaginationService.extractQuery(options, keys),
    };

    if (q) {
      query["$text"] = { $search: q };
    }

    const p = Number(page) || 1;
    const pp = Number(limit) || 10;

    const result = await Promise.allSettled([
      this.model.countDocuments(query),
      this.model
        .find(query, projections)
        .skip(pp * (p - 1))
        .limit(pp)
        .sort({ createdAt: "desc" })
        .populate(populate)
        .lean()
        .exec(),
    ]);

    let first: PromiseFulfilledResult<number>;
    let second: PromiseFulfilledResult<any>;
    if (result[0].status == "fulfilled") first = result[0];
    if (result[1].status == "fulfilled") second = result[1];
    const total = first!.value || 0;
    const pages = paginate(p, pp, total);
    return {
      data: second!.value || [],
      meta: { ...pages },
    };
  }
}
