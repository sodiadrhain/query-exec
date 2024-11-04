import { IQueryLogs, IUser, IPaginationOptions } from "../interfaces";
import { QueryLogs } from "../models";

class QueryLogService {
  // CreateQueryLog :one
  public createQueryLog(ql: IQueryLogs): Promise<IQueryLogs> {
    return QueryLogs.create(ql);
  }

  // GetQueryLog :one
  public getQueryLog(ql: IQueryLogs): Promise<IQueryLogs> {
    return QueryLogs.findById(ql._id);
  }

  // ListQueryLogs :many
   public listQueryLogs(
    arg: IPaginationOptions<IQueryLogs>
  ) {
    return QueryLogs.find({...arg.query}).skip(arg.limit * (arg.page - 1))
    .limit(arg.limit)
    .sort({ createdAt: "desc" })
    .lean()
    .exec()
  }

  // ListUserQueryLogs :many DESC
  public getQueryLogByUserId(user: IUser): Promise<IQueryLogs[]> {
    return QueryLogs.find({ userId: user._id }).sort({ createdAt: "desc" })
  }

  // UpdateQueryLog :one
  public updateQueryLog(ql: IQueryLogs, updates: IQueryLogs): Promise<IQueryLogs> {
    return QueryLogs.findByIdAndUpdate(ql._id, updates);
  }
}

export default QueryLogService;