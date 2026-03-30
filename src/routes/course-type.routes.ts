import { Router } from "express";
import { courseTypeController } from "../controllers/course-type.controller";

const router = Router();

router.get("/", courseTypeController.getAll);
router.get("/:id", courseTypeController.getById);
router.post("/", courseTypeController.create);
router.put("/:id", courseTypeController.update);
router.delete("/:id", courseTypeController.delete);

export default router;