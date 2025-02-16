import express from "express";
import {
  addMou,
  deleteMou,
  editMou,
  filterMous,

  getParticularMou,
} from "../controllers/mou.controller.js";
import { protectRoute } from "../middleware/protectedRoute.js";



const router = express.Router();

router.post("/add", protectRoute,addMou);
router.get("/filter", filterMous);
router.get("/view/:id", getParticularMou);
router.delete("/delete/:id", protectRoute, deleteMou);
router.put("/edit/:id", protectRoute, editMou);
export default router;
