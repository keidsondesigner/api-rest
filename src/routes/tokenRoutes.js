import { Router } from "express";
import tokenController from "../controllers/TokenController";

const router = new Router();

// Criandando um novo token;
router.post('/', tokenController.store);

export default router;