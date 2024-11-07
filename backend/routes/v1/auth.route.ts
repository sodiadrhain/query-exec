import Express, { Router } from "express";
import { authController } from "../../controllers";
import { authValidator } from "../../validators";
import { authMiddleware } from "../../middlewares";

const router: Router = Express.Router();

router.post("/login", authValidator.login, authController.login);
// router.post("/register", authValidator.register, authController.register);
router.get("/logout", authMiddleware, authController.logout);

export default router;
