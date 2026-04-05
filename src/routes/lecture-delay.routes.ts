import { Router } from "express";
import { lectureDelayController } from "../controllers/lecture-delay.controller";

const router = Router();

router.get("/", lectureDelayController.getAll);
router.get("/lecture/:lectureId", lectureDelayController.getByLectureId);
router.get("/subscription/:subscriptionId", lectureDelayController.getBySubscriptionId);
router.get("/:id", lectureDelayController.getById);
router.post("/", lectureDelayController.create);
router.put("/:id", lectureDelayController.update);
router.delete("/:id", lectureDelayController.delete);

export default router;