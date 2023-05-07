import express from "express";
import {
  addFornecedor,
  deleteFornecedor,
  getFornecedores,
  updateFornecedor,
} from "../controllers/fornecedor.js";

const router = express.Router();

router.get("/", getFornecedores);

router.post("/", addFornecedor);

router.put("/:id", updateFornecedor);

router.delete("/:id", deleteFornecedor);

export default router;
