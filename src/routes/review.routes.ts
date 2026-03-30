import { Router } from "express";
import { reviewController } from "../controllers/review.controller";

const router = Router();

router.get("/", reviewController.getAll);
router.get("/reviewer/:reviewerId", reviewController.getByReviewerId);
router.get("/:id", reviewController.getById);
router.post("/", reviewController.create);
router.put("/:id", reviewController.update);
router.delete("/:id", reviewController.delete);

export default router;