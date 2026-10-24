import { Router } from "express";
import { getHerb, listHerbs } from "../controllers/herbController.js";

const router = Router();
router.get("/", listHerbs);
router.get("/:id", getHerb);
export default router;
