import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

export const Form1 = ({ getEmpresas, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const empresa = ref.current;

      empresa.nome.value = onEdit.nome;
      empresa.cnpj.value = onEdit.cnpj;
      empresa.cep.value = onEdit.cep;
      empresa.empresas.value = onEdit.empresas;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const empresa = ref.current;

    if (
      !empresa.nome.value ||
      !empresa.cnpj.value ||
      !empresa.cep.value ||
      !empresa.empresas.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const cpfCnpjExists = await checkCpfCnpjExists(empresa.cpf.value);

    if (cpfCnpjExists) {
      return toast.error("CPF já cadastrado. Verifique os dados informados.");
    }

    const checkCpfCnpjExists = async (cpfCnpj) => {
      try {
        const response = await axios.get(
          "http://localhost:8800/empresas?cpf=" + cpfCnpj
        );
        const fornecedores = response.data;

        return fornecedores.length > 0;
      } catch (error) {
        console.error("Erro ao verificar CPF:", error);
        return false;
      }
    };

    try {
      const cepResponse = await axios.get(
        `http://viacep.com.br/ws/${empresa.cep.value}/json/`
      );
      const cepData = cepResponse.data;

      if (cepData.erro) {
        return toast.error("CEP inválido. Verifique o CEP digitado.");
      }

      if (onEdit) {
        await axios
          .put("http://localhost:8800/" + onEdit.id, {
            nome: empresa.nome.value,
            cnpj: empresa.cnpj.value,
            cep: empresa.cep.value,
            empresas: empresa.empresas.value,
          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      } else {
        await axios
          .post("http://localhost:8800", {
            nome: empresa.nome.value,
            cnpj: empresa.cnpj.value,
            cep: empresa.cep.value,
            empresas: empresa.empresas.value,
          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      }

      empresa.nome.value = "";
      empresa.cnpj.value = "";
      empresa.cep.value = "";
      empresa.empresas.value = "";

      setOnEdit(null);
      getEmpresas();
    } catch (error) {
      toast.error(
        "Erro ao consultar o CEP. Verifique sua conexão de internet."
      );
    }
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label> <Input name="nomeEmpresa" />
      </InputArea>
      <InputArea>
        <Label>CNPJ</Label> <Input name="cnpjEmpresa" type="number" />
      </InputArea>
      <InputArea>
        <Label>CEP</Label> <Input name="cepEmpresa" type="number" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export const Form2 = ({ getFornecedores, onEdit, setOnEdit }) => {
  const ref = useRef();
  const [tipoDocumento, setTipoDocumento] = useState("cpf");

  useEffect(() => {
    if (onEdit) {
      const fornecedor = ref.current;

      fornecedor.nome.value = onEdit.nome;
      fornecedor.email.value = onEdit.email;
      fornecedor.cep.value = onEdit.cep;
      fornecedor.cpf_ou_cnpj.value = onEdit.cpf_ou_cnpj;
      fornecedor.empresas.value = onEdit.empresas;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fornecedor = ref.current;

    if (
      !fornecedor.nome.value ||
      !fornecedor.email.value ||
      !fornecedor.cep.value ||
      !fornecedor.cpf_ou_cnpj.value ||
      !fornecedor.empresas.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const cpfCnpjExists = await checkCpfCnpjExists(
      fornecedor.cpf_ou_cnpj.value
    );

    if (cpfCnpjExists) {
      return toast.error(
        "CPF ou CNPJ já cadastrado. Verifique os dados informados."
      );
    }

    const checkCpfCnpjExists = async (cpfCnpj) => {
      try {
        const response = await axios.get(
          "http://localhost:8800/fornecedores?cpf_ou_cnpj=" + cpfCnpj
        );
        const fornecedores = response.data;

        return fornecedores.length > 0;
      } catch (error) {
        console.error("Erro ao verificar CPF ou CNPJ:", error);
        return false;
      }
    };

    try {
      const cepResponse = await axios.get(
        `https://viacep.com.br/ws/${fornecedor.cep.value}/json/`
      );
      const cepData = cepResponse.data;

      if (cepData.erro) {
        return toast.error("CEP inválido. Verifique o CEP digitado.");
      }

      if (onEdit) {
        await axios
          .put("http://localhost:8800/" + onEdit.id, {
            nome: fornecedor.nome.value,
            email: fornecedor.email.value,
            cep: fornecedor.cep.value,
            cpf_ou_cnpj: fornecedor.cpf_ou_cnpj.value,
            empresas: fornecedor.empresas.value,
          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      } else {
        await axios
          .post("http://localhost:8800", {
            nome: fornecedor.nome.value,
            email: fornecedor.email.value,
            cep: fornecedor.cep.value,
            cpf_ou_cnpj: fornecedor.cpf_ou_cnpj.value,
            empresas: fornecedor.empresas.value,
          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      }

      fornecedor.nome.value = "";
      fornecedor.email.value = "";
      fornecedor.cep.value = "";
      fornecedor.cpf_ou_cnpj.value = "";
      fornecedor.empresas.value = "";

      setOnEdit(null);
      getFornecedores();
    } catch (error) {
      toast.error(
        "Erro ao consultar o CEP. Verifique sua conexão de internet."
      );
    }
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label> <Input name="nomeFornecedor" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label> <Input name="emailFornecedor" type="email" />
      </InputArea>
      <InputArea>
        <input
          type="radio"
          name="tipoDocumento"
          value="cpf"
          id="cpffornecedor"
          checked={tipoDocumento === "cpf"}
          onChange={() => setTipoDocumento("cpf")}
        />
        <Label htmlFor="cpffornecedor">CPF</Label>
        <input
          type="radio"
          name="tipoDocumento"
          value="cnpj"
          id="cnpjfornecedor"
          checked={tipoDocumento === "cnpj"}
          onChange={() => setTipoDocumento("cnpj")}
        />
        <Label htmlFor="cnpjfornecedor">CNPJ</Label>
      </InputArea>
      {tipoDocumento === "cpf" && (
        <>
          <InputArea>
            <Label>CPF</Label> <Input name="cpfFornecedor" type="number" />
          </InputArea>
          <InputArea>
            <Label>RG</Label> <Input name="rgFornecedor" type="number" />
          </InputArea>
          <InputArea>
            <Label>Data de Nascimento</Label>{" "}
            <Input name="dataNascimentoFornecedor" type="date" />
          </InputArea>
        </>
      )}
      {tipoDocumento === "cnpj" && (
        <InputArea>
          <Label>CNPJ</Label> <Input name="cnpjFornecedor" type="number" />
        </InputArea>
      )}
      <InputArea>
        <Label>CEP</Label> <Input name="cepFornecedor" type="number" />
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};
