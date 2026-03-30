import { Router } from "express";
import { studentProfileController } from "../controllers/student-profile.controller";

const router = Router();

router.get("/", studentProfileController.getAll);
router.get("/:id", studentProfileController.getById);
router.post("/", studentProfileController.create);
router.put("/:id", studentProfileController.update);
router.delete("/:id", studentProfileController.delete);

export default router;