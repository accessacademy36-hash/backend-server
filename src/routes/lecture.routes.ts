import { Router } from "express";
import { lectureController } from "../controllers/lecture.controller";

const router = Router();

router.get("/", lectureController.getAll);
router.get("/:id", lectureController.getById);
router.post("/", lectureController.create);
router.put("/:id", lectureController.update);
router.delete("/:id", lectureController.delete);

export default router;