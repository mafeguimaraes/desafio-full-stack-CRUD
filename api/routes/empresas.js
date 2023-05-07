import express from "express";
import {
  addEmpresa,
  deleteEmpresa,
  getEmpresas,
  updateEmpresa,
} from "../controllers/empresa.js";

const router = express.Router();

router.get("/", getEmpresas);

router.post("/", addEmpresa);

router.put("/:id", updateEmpresa);

router.delete("/:id", deleteEmpresa);

export default router;
