import Express, { Router } from "express";
import { authMiddleware } from "../../middlewares";
import AuthRouter from "./auth.route";
import UserRouter from "./user.route";
import QueryRouter from "./query.route";

const AppRouter: Router = Express.Router();

AppRouter.use("/auth", AuthRouter);
AppRouter.use("/user", authMiddleware, UserRouter);
AppRouter.use("/query", authMiddleware, QueryRouter);

export default AppRouter;
