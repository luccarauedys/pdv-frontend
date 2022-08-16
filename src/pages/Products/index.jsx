import React from "react";
import styled from "styled-components";
import { ProductForm } from "../../components/ProductForm";
import { ProductsList } from "../../components/ProductsList";
import { createProduct, getProducts } from "../../services/api";
import { ToastContainer } from "react-toastify";
import { notifyError, notifySuccess } from "../../utils/toasts";
import { Loading } from "../../components/Loading";

export function Products() {
  const [allProducts, setAllProducts] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getAllProducts = async () => {
    try {
      const response = await getProducts();
      setAllProducts(response.data);
      setProducts(response.data);
    } catch (error) {
      return notifyError("Ops... Ocorreu um erro ao buscar a lista de produtos!");
    } finally {
      setIsLoading(false);
    }
  };

  const registerProduct = async (product) => {
    try {
      await createProduct(product);
      getAllProducts();
      return notifySuccess("Produto registrado com sucesso!");
    } catch (error) {
      return notifyError("Ops... Ocorreu um erro ao tentar cadastrar o produto!");
    }
  };

  React.useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Container>
        <h1>Cadastro de Produtos</h1>
        <ProductForm handleFormSubmit={registerProduct} />

        {isLoading ? (
          <Loading />
        ) : (
          <ProductsList
            products={products}
            setProducts={setProducts}
            allProducts={allProducts}
            getAllProducts={getAllProducts}
          />
        )}
      </Container>
      <ToastContainer />
    </>
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
