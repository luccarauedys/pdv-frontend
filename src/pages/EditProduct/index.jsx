import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProductForm } from "../../components/ProductForm";
import { updateProduct } from "../../services/api";
import { ToastContainer } from "react-toastify";
import { notifyError, notifySuccess } from "../../utils/toasts";

export function EditProduct() {
  const navigate = useNavigate();

  const handleEditProduct = async (product, reset) => {
    try {
      await updateProduct(product);
      notifySuccess("Produto editado com sucesso!");
      setTimeout(() => {
        navigate("/home/products");
      }, 3000);
    } catch (error) {
      if (error.response.data) notifyError(error.response.data);
    }
  };

  return (
    <>
      <Container>
        <h1>Edição de produto</h1>
        <ProductForm handleFormSubmit={handleEditProduct} />
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
