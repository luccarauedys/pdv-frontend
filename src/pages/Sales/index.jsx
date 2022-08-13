import React from "react";
import styled from "styled-components";
import { getProductsByName } from "../../services/api";
import { TableContainer } from "../../components/ProductsList";
import { MinusCircle, PlusCircle } from "phosphor-react";
import { ToastContainer } from "react-toastify";
import { notifyError, notifySuccess } from "../../utils/toasts";
import { useNavigate } from "react-router-dom";

export function Sales() {
  const [name, setName] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [cart, setCart] = React.useState([]);

  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, product) => {
    return total + product.sellingPrice * product.quantity;
  }, 0);

  const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

  const handleSearchProducts = async () => {
    if (name.length === 0) return;
    try {
      const response = await getProductsByName(name);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetName = () => {
    setName("");
    setProducts([]);
  };

  const handleAddToCart = (product) => {
    const { id: productId, companyId, name, quantity: stock, costPrice, sellingPrice } = product;

    const addedProduct = {
      productId,
      companyId,
      name,
      stock,
      costPrice,
      sellingPrice,
      quantity: 1,
    };

    handleIncreaseQuantity(addedProduct);
  };

  const handleIncreaseQuantity = (product) => {
    const isInCart = cart.find((p) => p.productId === product.productId);

    if (!isInCart) {
      setCart([...cart, product]);
      return;
    }

    if (isInCart && isInCart.quantity < isInCart.stock) {
      const { quantity } = isInCart;
      const product = { ...isInCart, quantity: quantity + 1 };

      const productsInCart = cart.map((p) => {
        if (p.productId === isInCart.productId) return product;
        return p;
      });

      setCart([...productsInCart]);
      return;
    }

    if (isInCart && isInCart.quantity >= isInCart.stock) {
      return notifyError("A quantidade adicionada excedeu o estoque!");
    }
  };

  const handleDecreaseQuantity = (product) => {
    const isInCart = cart.find((p) => p.productId === product.productId);
    console.log(isInCart);

    if (!isInCart) return;

    if (isInCart && isInCart.quantity <= 0) {
      const productsInCart = cart.filter((p) => p.productId !== isInCart.productId);
      setCart([...productsInCart]);
      return;
    }

    if (isInCart && isInCart.quantity > 0) {
      const { quantity } = isInCart;
      const product = { ...isInCart, quantity: quantity - 1 };

      const productsInCart = cart.map((p) => {
        if (p.productId === isInCart.productId) return product;
        return p;
      });

      setCart([...productsInCart]);
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleConfirmSale = () => {
    // TODO: chamada pra api
    notifySuccess("Venda realizada com sucesso!");
    setTimeout(() => {
      navigate("/home/history");
    }, 3000);
  };

  return (
    <Container>
      <h1>Realizar venda</h1>

      <SearchBarContainer>
        <h2>Pesquisar produtos</h2>
        <SearchBar>
          <input
            type="text"
            placeholder="Nome do produto"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <button onClick={handleSearchProducts}>Pesquisar</button>
          <button onClick={handleResetName}>Limpar</button>
        </SearchBar>
      </SearchBarContainer>

      {products.length > 0 && (
        <TableContainer>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{BRL.format(product.sellingPrice)}</td>
                <td>{product.quantity}</td>
                <td>
                  <button onClick={() => handleAddToCart(product)}>Adicionar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </TableContainer>
      )}

      {cart.length > 0 && (
        <CartContainer>
          <h2>Adicionados ao carrinho</h2>

          <div>
            {cart.map((product) => {
              if (product.quantity > 0) {
                return (
                  <div key={product.id} className="product">
                    <h3>{product.name}</h3>
                    <p>
                      <strong>Quantidade:</strong> {product.quantity}
                    </p>
                    <p>
                      <strong>Total: </strong>
                      {BRL.format(product.sellingPrice * product.quantity)}
                    </p>
                    <div>
                      <MinusCircle
                        onClick={() => handleDecreaseQuantity(product)}
                        size={32}
                        weight="fill"
                      />
                      <PlusCircle
                        onClick={() => handleIncreaseQuantity(product)}
                        size={32}
                        weight="fill"
                      />
                    </div>
                  </div>
                );
              }
            })}
          </div>

          <Footer>
            <div className="price">
              <h3>
                TOTAL: <span>{BRL.format(totalPrice)}</span>
              </h3>
            </div>
            <div className="actions">
              <button onClick={handleClearCart}>Cancelar</button>
              <button onClick={handleConfirmSale}>Confirmar venda</button>
            </div>
          </Footer>
        </CartContainer>
      )}
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

  tbody {
    td:last-child {
      text-align: center;
    }
    button {
      padding: 0.5rem;
      width: 40%;
      background-color: #06283d;
    }
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SearchBar = styled.div`
  display: grid;
  grid-template-columns: minmax(400px, 1fr) repeat(2, minmax(100px, 400px));
  gap: 0.5rem;

  button {
    &:last-child {
      /* background-color: #333; */
    }
  }

  input,
  button {
    padding: 1rem;
  }

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`;

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .product {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: #c6c6c6;
    border-radius: 0.3rem;
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
  }

  svg {
    color: #06283d;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  button {
    width: 100%;
    padding: 1rem;

    &:first-child {
      background-color: red;
    }

    &:last-child {
      background-color: green;
    }
  }

  div.price {
    span {
      color: #06283d;
    }
  }

  div.actions {
    width: 100%;
    max-width: 750px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.25rem;

    @media (max-width: 750px) {
      grid-template-columns: 1fr;

      button {
        max-width: 100%;
      }
    }
  }
`;
