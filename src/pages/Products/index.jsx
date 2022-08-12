import React from "react";
import styled from "styled-components";
import { ProductForm } from "../../components/ProductForm";
import { ProductsList } from "../../components/ProductsList";
import { postProduct, getProducts } from "../../services/api";
import { ToastContainer } from "react-toastify";
import { notifyError } from "../../utils/toasts";

export function Products() {
  const [allProducts, setAllProducts] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  const getAllProducts = async () => {
    try {
      const response = await getProducts();
      setAllProducts(response.data);
      setProducts(response.data);
    } catch (error) {
      return notifyError("Ops... Ocorreu um erro ao buscar a lista de produtos!");
    }
  };

  const registerProduct = async (product) => {
    await postProduct(product);
    getAllProducts();
  };

  React.useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Container>
      <h1>Cadastro de Produtos</h1>
      <ProductForm handleFormSubmit={registerProduct} />
      <ProductsList
        products={products}
        setProducts={setProducts}
        allProducts={allProducts}
        getAllProducts={getAllProducts}
      />
      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    margin-bottom: 1rem;
  }
`;
