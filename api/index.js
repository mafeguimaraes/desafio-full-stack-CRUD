import express from "express";
import empresaRoutes from "./routes/empresas.js";
import fornecedorRoutes from "./routes/fornecedores.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", empresaRoutes);

app.use("/", fornecedorRoutes);

app.listen(8800);
