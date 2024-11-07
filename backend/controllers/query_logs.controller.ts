import { Request, Response } from "express";
import { queryLogService, userService } from "../services";
import { isEmptyObject, checkLimitInQuery } from "../utils";
import QueryDbService from "../services/query_db.service";

class QueryLogController {
  /**
   * @route POST /api/query
   * @desc Create a query
   * @access Private
   */
  create = async (req: Request, res: Response) => {
    const { type, query } = req.body;
    let status, isApproved: boolean;
    let queryResult;
    let queryType = type.toUpperCase();

    if (!query.includes(queryType)) {
        return res.badRequest(`Query passed is not of ${queryType} type`)
    }

     // Check if a LIMIT clause is passed and return is > 1000
     if (checkLimitInQuery(query, 1000)) {
        return res.badRequest("Query LIMIT must not be greater than 1000")
     }

    try {
        const user = await userService.getUser({_id: req.user.userId});

        if (queryType === "SELECT" && user.permissions.includes("SELECT")) {
            queryResult = await new QueryDbService(query).exec();
            status = true;
            isApproved = true;
        }

      const newQuerylog = await queryLogService.createQueryLog({
        type,
        query,
        status,
        isApproved,
        userId: req.user.userId,
      });

      res.ok({query: newQuerylog._id, result: queryResult}, "Query logged successfully");
    } catch (error) {
      res.serverError(error);
    }
  };


  /**
   * @route GET /api/query
   * @desc Get all queries
   * @access Private.
   */
  get = async (req: Request, res: Response) => {
    const query = req.query;

    try {
      const queryLogs = await queryLogService.listQueryLogs(query);

      res.ok(queryLogs,
        "Queries fetched successfully"
      );
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route PUT /api/query/:id/query
   * @desc Update a query
   * @access Private.
   */
  update = async (req: Request, res: Response) => {
    const { type, query } = req.body;
    const _id = req.params.id;

    if (isEmptyObject(req.body))
      return res.badRequest("Body must have at least one of [type, query]");

    try {
      const queryLog = await queryLogService.getQueryLog({ _id });
      if (!queryLog) {
        return res.notFound("Query not found");
      }

      if (queryLog.userId !== req.user.userId) {
        return res.unauthorized("You do not have access to this action");
      }

      const updatedQuery = await queryLogService.updateQueryLog(queryLog, {
        type,
        query,
      });

      res.ok(updatedQuery, "Query updated successfully");
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route PUT /api/query/:id/approve
   * @desc Approve a query
   * @access Private.
   */
  approve = async (req: Request, res: Response) => {
    const _id = req.params.id;
    try {
        // Can approve a query for execution if user has the right permissions
        // User cannot approve their own query, exception for [permissions].APPROVE_TYPE users
        const query = await queryLogService.getQueryLog({_id});

        if (query.isApproved) {
            return res.ok(query._id, "Query already approved");
        }

        const user = await userService.getUser({_id: req.user.userId});

        if (user.permissions.includes(`APPROVE_${query.type}`)) {
            const _ = await new QueryDbService(query.query).exec();
            // Update query status
            await queryLogService.updateQueryLog({_id: query._id}, {isApproved: true, status: true})
            return res.ok(query._id, "Query executed successfully");
        }

        res.badRequest("You do not the right permisions to approve this query");
    } catch (error) {
      res.serverError(error);
    }
  };

    /**
   * @route GET /api/query/:id/run
   * @desc Run an already created query
   * @access Private
   */
    run = async (req: Request, res: Response) => {
        const _id = req.params.id;
        let queryResult;

        try {    
        const query = await queryLogService.getQueryLog({_id});
        if (!query.isApproved) {
            return res.badRequest("Query is not approved");
        }

        queryResult = await new QueryDbService(query.query).exec();

        res.ok({query, result: queryResult}, "Query fetched successfully");
        } catch (error) {
        res.serverError(error);
        }
    };

}

export default QueryLogController;