import Express, { Router } from "express";
import { userController } from "../../controllers";
import { userValidator } from "../../validators";

const router: Router = Express.Router();

router.get("/profile", userController.getProfile);
router.put("/profile", userValidator.updateProfile, userController.updateProfile);

export default router;
