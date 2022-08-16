import React from "react";
import { useNavigate } from "react-router-dom";
import { CartContainer, Container, Footer, SearchBar, SearchBarContainer } from "./styles";
import { MinusCircle, PlusCircle } from "phosphor-react";
import { createSale, getProductsByName, updateProduct } from "../../services/api";
import { TableContainer } from "../../components/ProductsList/styles";
import { BRL } from "../../utils/BRLformatter";
import { ToastContainer } from "react-toastify";
import { notifyError, notifyInfo, notifySuccess } from "../../utils/toasts";
import { Loading } from "../../components/Loading";

export function Sales() {
  const [name, setName] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [cart, setCart] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSearchProducts = async () => {
    if (name.length === 0) return;
    setIsLoading(true);
    try {
      const response = await getProductsByName(name);
      setProducts(response.data);

      if (response.data.length === 0) notifyInfo("Não há produtos registrados com esse nome!");
    } catch (error) {
      notifyError("Erro interno no Servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSearch = () => {
    setName("");
    setProducts([]);
  };

  const handleCancelSale = () => {
    setCart([]);
    notifyInfo("Venda cancelada!");
  };

  const handleResetAll = () => {
    setName("");
    setProducts([]);
    setCart([]);
  };

  const handleAddToCart = (product) => {
    handleIncreaseQuantity(product);
  };

  const handleIncreaseQuantity = (product) => {
    const isInCart = cart.find((prod) => prod.id === product.id);

    if (!isInCart) {
      const addedProduct = { ...product, quantity: 1 };
      return setCart([...cart, addedProduct]);
    }

    if (isInCart && isInCart.stock > isInCart.quantity) {
      const { quantity } = isInCart;

      const editedProduct = { ...product, quantity: quantity + 1 };

      const updatedCart = cart.map((prod) => {
        if (prod.id === editedProduct.id) return editedProduct;
        return prod;
      });

      return setCart(updatedCart);
    }

    if (isInCart && isInCart.quantity >= isInCart.stock) {
      return notifyError("A quantidade adicionada excedeu o estoque!");
    }
  };

  const handleDecreaseQuantity = (product) => {
    const isInCart = cart.find((prod) => prod.id === product.id);

    if (!isInCart) return;

    if (isInCart && isInCart.quantity === 0) {
      const updatedCart = cart.filter((prod) => prod.id !== isInCart.id);
      return setCart(updatedCart);
    }

    if (isInCart && isInCart.quantity > 0) {
      const { quantity } = isInCart;

      const editedProduct = { ...product, quantity: quantity - 1 };

      const updatedCart = cart
        .map((prod) => {
          if (prod.id === editedProduct.id) return editedProduct;
          return prod;
        })
        .filter((prod) => prod.quantity > 0);

      setCart(updatedCart);
    }
  };

  const handleConfirmSale = async () => {
    const updatedProducts = cart.map((product) => {
      const { stock, quantity } = product;
      return { ...product, stock: stock - quantity };
    });

    const saleData = {
      companyId: updatedProducts[0].companyId,
      products: JSON.stringify(updatedProducts),
      totalPrice: calcTotalPrice(),
    };

    try {
      await createSale(saleData);

      for (let product of updatedProducts) {
        await updateProduct(product);
      }

      handleResetAll();
      notifySuccess("Venda realizada com sucesso!");

      setTimeout(() => {
        navigate("/home/history");
      }, 3000);
    } catch (error) {
      notifyError("Ops... Ocorreu um erro. Venda não realizada!");
    }
  };

  const calcTotalPrice = () => {
    return cart.reduce((total, product) => {
      return total + product.sellingPrice * product.quantity;
    }, 0);
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
            onKeyUp={(e) => {
              if (e.code === "Enter") handleSearchProducts();
            }}
          />
          <button onClick={handleSearchProducts}>Pesquisar</button>
          <button onClick={handleResetSearch}>Limpar</button>
        </SearchBar>
      </SearchBarContainer>

      {isLoading && <Loading />}

      {!isLoading && products.length > 0 && (
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
                <td>{product.stock}</td>
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
                TOTAL: <span>{BRL.format(calcTotalPrice())}</span>
              </h3>
            </div>
            <div className="actions">
              <button onClick={handleCancelSale}>Cancelar</button>
              <button onClick={handleConfirmSale}>Confirmar venda</button>
            </div>
          </Footer>
        </CartContainer>
      )}
      <ToastContainer />
    </Container>
  );
}
