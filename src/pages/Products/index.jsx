import styled from "styled-components";
import { ProductForm } from "../../components/ProductForm";
import { postProduct } from "../../services/api";

export function Products() {
  const registerProduct = async (product) => {
    await postProduct(product);
    window.location.reload();
  };

  return (
    <Container>
      <h1>Cadastro de Produtos</h1>
      <ProductForm handleFormSubmit={registerProduct} />
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  padding: 2rem;

  h1 {
    margin-bottom: 1rem;
  }
`;
