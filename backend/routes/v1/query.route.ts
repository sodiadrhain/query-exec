import Express, { Router } from "express";
import { queryLogController } from "../../controllers";
import { queryLogValidator } from "../../validators"

const router: Router = Express.Router();

router.post("/", queryLogValidator.create, queryLogController.create);
router.get("/", queryLogController.get);
router.put("/:id/update", queryLogValidator.update, queryLogController.update);
router.put("/:id/approve", queryLogValidator.approve, queryLogController.approve);
router.get("/:id/run", queryLogController.run);

export default router;