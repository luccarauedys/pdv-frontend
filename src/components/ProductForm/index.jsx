import React from "react";
import { useLocation } from "react-router-dom";
import { FormContainer, FormItem } from "./styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    stock: yup
      .number()
      .typeError("Quantidade deve ser um número")
      .min(0, "Quantidade não pode ser um número negativo")
      .required("Esse campo é obrigatório"),
  })
  .required();

export function ProductForm({ handleFormSubmit }) {
  const location = useLocation();
  const product = location.state;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (product && location.pathname === `/home/products/${product?.id}`) {
    setValue("name", product.name);
    setValue("costPrice", product.costPrice);
    setValue("sellingPrice", product.sellingPrice);
    setValue("stock", product.stock);
  }

  const onSubmit = (data) => {
    const productData = { ...data, id: product?.id, companyId: product?.companyId };
    handleSubmitAction(productData);
    reset();
  };

  const handleSubmitAction = async (productData) => {
    await handleFormSubmit(productData);
  };

  return (
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
        <label>Estoque</label>
        <input {...register("stock", { required: true })} />
        <p className="error">{errors.stock?.message}</p>
      </FormItem>

      <FormItem>
        <button>{location.pathname === "/home/products" ? "Cadastrar" : "Confirmar edição"}</button>
      </FormItem>
    </FormContainer>
  );
}
