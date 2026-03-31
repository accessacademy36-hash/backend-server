import { Router } from "express";
import { curriculumController } from "../controllers/curriculum.controller";
import { authenticate, isAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", curriculumController.getAll);
router.get("/country/:countryId", curriculumController.getByCountryId);
router.get("/:id", curriculumController.getById);
router.post("/", authenticate, isAdmin, curriculumController.create);
router.put("/:id", authenticate, isAdmin, curriculumController.update);
router.delete("/:id", authenticate, isAdmin, curriculumController.delete);

export default router;