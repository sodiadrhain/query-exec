import { IQueryLogs } from "../interfaces";
import { QueryLogs } from "../models";
import PaginationService from "./pagination.service";

class QueryLogService {
  private pagination: PaginationService<IQueryLogs>;

  constructor() {
    this.pagination = new PaginationService(QueryLogs);
  }

  // CreateQueryLog :one
  public createQueryLog(ql: IQueryLogs): Promise<IQueryLogs> {
    return QueryLogs.create(ql);
  }

  // GetQueryLog :one
  public getQueryLog(ql: IQueryLogs): Promise<IQueryLogs> {
    return QueryLogs.findById(ql._id);
  }

  // ListQueryLogs :many
  public listQueryLogs(query: object) {
    return this.pagination.paginate({ ...query }, ["isApproved", "status"]);
  }

  // UpdateQueryLog :one
  public updateQueryLog(ql: IQueryLogs, updates: IQueryLogs): Promise<IQueryLogs> {
    return QueryLogs.findByIdAndUpdate(ql._id, updates);
  }
}

export default QueryLogService;
