import styled from "styled-components";
import { BRL } from "../../utils/BRLformatter";
import { formatDate } from "../../utils/dateFormatter";

export function SaleCard({ sale, handleDeleteSale }) {
  return (
    <Container>
      <h3>Venda realizada em {formatDate(sale.date)}</h3>

      {sale.products.map((product) => {
        return (
          <div className="product-card">
            <h4>⚫️ {product.name}</h4>
            <p>
              <strong>Quantidade:</strong> {product.quantity}
            </p>
            <p>
              <strong>Preço unitário:</strong> {BRL.format(product.sellingPrice)}
            </p>
            <p>
              <strong>Preço total:</strong> {BRL.format(product.sellingPrice * product.quantity)}
            </p>
          </div>
        );
      })}

      <h3>Preço total da venda: {BRL.format(sale.totalPrice)}</h3>

      <div className="bottom">
        <button onClick={() => handleDeleteSale(sale.id)}>Deletar venda</button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 3rem;
  border-radius: 0.5rem;
  background-color: #222;
  color: #e3e3e3;

  h3 {
    font-size: 1.3rem;
  }
  h4 {
    font-size: 1.2rem;
  }

  .product-card {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    p {
      font-weight: 500;
    }

    strong {
      font-weight: 500;
      color: #adbedd;
    }
  }

  .bottom {
    height: 100%;
    display: flex;
    align-items: flex-end;

    button {
      width: 100%;
      padding: 0.8rem;
    }
  }
`;
