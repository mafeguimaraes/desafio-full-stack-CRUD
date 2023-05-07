import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
`;

export const Grid1 = ({ empresas, setEmpresas, setOnEdit }) => {
  const handleEmpresaEdit = (item) => {
    setOnEdit(item);
  };
  const handleEmpresaDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = empresas.filter((empresa) => empresa.id !== id);

        setEmpresas(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>CNPJ</Th>
          <Th>CEP</Th>
          <Th>Fornecedores</Th>
        </Tr>
      </Thead>
      <Tbody>
        {empresas.map((item, i) => (
          <Tr key={i}>
            <Td width="20%">{item.nome}</Td>
            <Td width="20%">{item.cnpj}</Td>
            <Td width="20%"> {item.cep}</Td>
            <Td width="40%"> {item.fornecedores}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEmpresaEdit(item.id)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleEmpresaDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export const Grid2 = ({ fornecedores, setFornecedores, setOnEdit }) => {
  const handleFornecedorEdit = (item) => {
    setOnEdit(item);
  };

  const handleFornecedorDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = fornecedores.filter(
          (fornecedor) => fornecedor.id !== id
        );

        setFornecedores(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th>CPF/CNJP</Th>
          <Th>CEP</Th>
          <Th>Empresas</Th>
        </Tr>
      </Thead>
      <Tbody>
        {fornecedores.map((item, i) => (
          <Tr key={i}>
            <Td width="20%">{item.nome}</Td>
            <Td width="20%">{item.email}</Td>
            <Td width="20%"> {item.cpf}</Td>
            <Td width="20%"> {item.cep}</Td>
            <Td width="40%"> {item.empresas}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleFornecedorEdit(item.id)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleFornecedorDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
