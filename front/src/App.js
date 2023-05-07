import GlobalStyle from "./styles/global";
import styled from "styled-components";
import { Form1, Form2 } from "./components/Form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid1, Grid2 } from "./components/Grid";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;
const Title = styled.h2``;

function App() {
  const [empresas, setEmpresas] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [onEditEmpresas, setOnEditEmpresas] = useState(null);
  const [onEditFornecedores, setOnEditFornecedores] = useState(null);

  const getEmpresas = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setEmpresas(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  const getFornecedores = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setFornecedores(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getEmpresas();
  }, [setEmpresas]);

  useEffect(() => {
    getFornecedores();
  }, [setFornecedores]);

  return (
    <>
      <Container>
        <Title>Empresas</Title>
        <Form1
          onEdit={onEditEmpresas}
          setOnEdit={setOnEditEmpresas}
          getUsers={getEmpresas}
        />
        <Grid1
          empresas={empresas}
          setEmpresas={setEmpresas}
          setOnEdit={setOnEditEmpresas}
        />
      </Container>
      <Container>
        <Title>Fornecedores</Title>
        <Form2
          onEdit={onEditFornecedores}
          setOnEdit={setOnEditFornecedores}
          getUsers={getFornecedores}
        />
        <Grid2
          fornecedores={fornecedores}
          setEmpresas={setFornecedores}
          setOnEdit={setOnEditFornecedores}
        />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
