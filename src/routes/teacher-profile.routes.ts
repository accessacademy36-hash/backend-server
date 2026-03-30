import { Router } from "express";
import { teacherProfileController } from "../controllers/teacher-profile.controller";

const router = Router();

router.get("/", teacherProfileController.getAll);
router.get("/:id", teacherProfileController.getById);
router.post("/", teacherProfileController.create);
router.put("/:id", teacherProfileController.update);
router.delete("/:id", teacherProfileController.delete);

export default router;