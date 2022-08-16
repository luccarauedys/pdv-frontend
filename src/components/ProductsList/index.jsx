import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, FormContainer, TableContainer } from "./styles";
import { PencilSimple, TrashSimple } from "phosphor-react";
import { getProductsByName, deleteProduct } from "../../services/api";
import { BRL } from "../../utils/BRLformatter";
import { ToastContainer } from "react-toastify";
import { notifyError, notifyInfo, notifySuccess } from "../../utils/toasts";

export function ProductsList({ products, setProducts, allProducts, getAllProducts }) {
  const [name, setName] = React.useState("");
  const navigate = useNavigate();

  const handleFilterByName = async () => {
    try {
      const response = await getProductsByName(name);
      setProducts(response.data);

      if (response.data.length === 0)
        return notifyInfo("Não há produtos registrados com esse nome!");
    } catch (error) {
      return notifyError("Ops... Ocorreu um erro ao tentar buscar o produto!");
    }
  };

  const handleClearFilter = () => {
    setName("");
    setProducts([...allProducts]);
  };

  const handleEditProduct = (product) => {
    navigate(`/home/products/${product.id}`, { state: { ...product } });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      notifySuccess("Produto deletado com sucesso!");
      getAllProducts();
    } catch (error) {
      return notifyError("Ops... Ocorreu um erro ao tentar deletar esse produto!");
    }
  };

  return (
    <Container>
      <div className="search-products-form">
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

          <button onClick={handleFilterByName}>Pesquisar</button>

          <button onClick={handleClearFilter} className="clearFilterBtn">
            Limpar filtro
          </button>
        </FormContainer>
      </div>

      <div className="table">
        <TableContainer>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço de custo</th>
              <th>Preço de venda</th>
              <th>Estoque</th>
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
                  <td>{product.stock}</td>
                  <td className="icons">
                    <PencilSimple
                      onClick={() => handleEditProduct(product)}
                      size={25}
                      color="#222222"
                    />
                    <TrashSimple
                      onClick={() => handleDeleteProduct(product.id)}
                      size={25}
                      color="#FF1E00"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TableContainer>
      </div>

      <ToastContainer />
    </Container>
  );
}
