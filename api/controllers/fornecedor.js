import { db } from "../db.js";

export const getFornecedores = (_, res) => {
  const q = "SELECT * FROM fornecedores";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addFornecedor = (req, res) => {
  const q =
    "INSERT INTO fornecedores(`nome`, `email`, `cep`, `cpf_ou_cnpj`, `empresas`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.emial,
    req.body.cep,
    req.body.cpf_ou_cnpj,
    req.body.empresas,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Fornecedor adicionado com sucesso.");
  });
};

export const updateFornecedor = (req, res) => {
  const q =
    "UPDATE fornecedores SET `nome` = ?, `email` = ?, `cep` = ?, `cpf_ou_cnpj` = ?,  `empresas` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.emial,
    req.body.cep,
    req.body.cpf_ou_cnpj,
    req.body.empresas,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Fornecedor atualizado com sucesso.");
  });
};

export const deleteFornecedor = (req, res) => {
  const q = "DELETE FROM fornecedores WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Fornecedor deletado com sucesso.");
  });
};
