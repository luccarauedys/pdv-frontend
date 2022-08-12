import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PencilSimple, TrashSimple } from "phosphor-react";
import { getProductsByName, deleteProduct } from "../../services/api";
import { ToastContainer } from "react-toastify";
import { notifyError } from "../../utils/toasts";

export function ProductsList(props) {
  const [name, setName] = React.useState("");

  const { products, setProducts, allProducts, getAllProducts } = props;

  const navigate = useNavigate();

  const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

  const handleFilterByName = async () => {
    try {
      const response = await getProductsByName(name);
      setProducts(response.data);
    } catch (error) {
      return notifyError("Ops... Ocorreu um erro ao tentar buscar o produto!");
    }
  };

  const handleClearFilter = () => {
    setName("");
    setProducts([...allProducts]);
  };

  const handleEditProduct = (productId) => {
    navigate(`/home/products/${productId}`);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      getAllProducts();
    } catch (error) {
      return notifyError("Ops... Ocorreu um erro ao tentar deletar esse produto!");
    }
  };

  return (
    <Container>
      <h1>Listagem de produtos</h1>

      <FormContainer>
        <input
          type="text"
          placeholder="Nome do produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyUp={(e) => {
            if (e.code === "Enter") handleFilterByName();
          }}
        />

        <button type="button" onClick={handleFilterByName}>
          Pesquisar
        </button>

        {name && (
          <button onClick={handleClearFilter} className="clearFilterBtn">
            Limpar filtro
          </button>
        )}
      </FormContainer>

      <TableContainer>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço de custo</th>
            <th>Preço de venda</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{BRL.format(product.costPrice)}</td>
                <td>{BRL.format(product.sellingPrice)}</td>
                <td>{product.quantity}</td>
                <td>
                  <PencilSimple
                    onClick={() => handleEditProduct(product.id)}
                    size={22}
                    color="#222222"
                  />
                  <TrashSimple
                    onClick={() => handleDeleteProduct(product.id)}
                    size={22}
                    color="#FF1E00"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </TableContainer>
      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1rem;

  input,
  button {
    padding: 1rem;
  }

  button {
    &.clearFilterBtn {
      background-color: #256d85;
    }
  }
`;

const TableContainer = styled.table`
  width: 100%;
  text-align: left;

  th {
    background-color: #333333;
    color: #ffffff;
  }

  td:first-child {
    font-weight: 600;
  }

  tr:nth-child(even) {
    background-color: #c4c4c4;
  }

  th,
  td {
    padding: 1rem;
    border-radius: 0.2rem;
  }
`;
