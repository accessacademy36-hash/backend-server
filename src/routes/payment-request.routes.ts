import { Router } from "express";
import { paymentRequestController } from "../controllers/payment-request.controller";

const router = Router();

router.get("/", paymentRequestController.getAll);
router.get("/:id", paymentRequestController.getById);
router.post("/", paymentRequestController.create);
router.put("/:id", paymentRequestController.update);
router.delete("/:id", paymentRequestController.delete);

export default router;