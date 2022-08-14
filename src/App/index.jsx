import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Home } from "../pages/Home";
import { Products } from "../pages/Products";
import { EditProduct } from "../pages/EditProduct";
import { Sales } from "../pages/Sales";
import { History } from "../pages/History";
import { Cashflow } from "../pages/Cashflow";
import { NotFound } from "../pages/NotFound";
import { GlobalStyle } from "../assets/globalStyle";

export function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<EditProduct />} />
            <Route path="sales" element={<Sales />} />
            <Route path="history" element={<History />} />
            <Route path="cashflow" element={<Cashflow />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
