import React from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCompanyData } from "../../hooks/useCompanyData";

const schema = yup
  .object({
    name: yup.string().required("O nome do produto é obrigatório"),
    costPrice: yup
      .number("")
      .typeError("Preço de custo deve ser um número")
      .positive("Preço de custo deve ser um número maior que 0")
      .required("Esse campo é obrigatório"),
    sellingPrice: yup
      .number()
      .typeError("Preço de venda deve ser um número")
      .positive("Preço de venda deve ser um número maior que 0")
      .required("Esse campo é obrigatório"),
    quantity: yup
      .number()
      .typeError("Quantidade deve ser um número")
      .min(0, "Quantidade não pode ser um número negativo")
      .required("Esse campo é obrigatório"),
  })
  .required();

export function ProductForm({ handleFormSubmit }) {
  const [companyData] = useCompanyData();
  const { company } = companyData;

  const params = useParams();
  const location = useLocation();
  const product = location.state;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (product && location.pathname === `/home/products/${product.id}`) {
    setValue("name", product.name);
    setValue("costPrice", product.costPrice);
    setValue("sellingPrice", product.sellingPrice);
    setValue("quantity", product.quantity);
  }

  const onSubmit = (data) => {
    let productData;

    if (location.pathname === "/home/products") {
      productData = { ...data, companyId: company.id };
    } else {
      productData = { id: Number(params.id), ...data, companyId: company.id };
    }

    handleSubmitAction(productData);
  };

  const handleSubmitAction = async (productData) => {
    await handleFormSubmit(productData);
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <label>Nome do produto</label>
          <input {...register("name", { required: true })} />
          <p className="error">{errors.name?.message}</p>
        </FormItem>

        <FormItem>
          <label>Preço de custo</label>
          <input {...register("costPrice", { required: true })} />
          <p className="error">{errors.costPrice?.message}</p>
        </FormItem>

        <FormItem>
          <label>Preço de venda</label>
          <input {...register("sellingPrice", { required: true })} />
          <p className="error">{errors.sellingPrice?.message}</p>
        </FormItem>

        <FormItem>
          <label>Quantidade</label>
          <input {...register("quantity", { required: true })} />
          <p className="error">{errors.quantity?.message}</p>
        </FormItem>

        <FormItem>
          <button>
            {location.pathname === "/home/products" ? "Cadastrar" : "Confirmar edição"}
          </button>
        </FormItem>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1rem;
`;

const FormItem = styled.div`
  button,
  input {
    width: 100%;
    padding: 1rem;
    font-size: 1.1rem;
  }

  p.error {
    margin-top: 5px;
    font-weight: 500;
    color: #ff1e00;
  }
`;
