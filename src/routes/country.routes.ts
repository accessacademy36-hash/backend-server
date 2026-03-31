import { Router } from "express";
import { countryController } from "../controllers/country.controller";
import { authenticate, isAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", countryController.getAll);
router.get("/:id", countryController.getById);
router.post("/", authenticate, isAdmin, countryController.create);
router.put("/:id", authenticate, isAdmin, countryController.update);
router.delete("/:id", authenticate, isAdmin, countryController.delete);

export default router;