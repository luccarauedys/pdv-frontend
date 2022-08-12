import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCompanyData } from "../../hooks/useCompanyData";
import { ToastContainer } from "react-toastify";
import { notifyError } from "../../utils/toasts";

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (productData) => {
    const product = { ...productData, companyId: company.id };
    try {
      await handleFormSubmit(product);
      reset();
    } catch (error) {
      if (error.response.data) notifyError(error.response.data);
    }
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <input placeholder="Nome do produto" {...register("name", { required: true })} />
          <p className="error">{errors.name?.message}</p>
        </FormItem>

        <FormItem>
          <input placeholder="Preço de custo" {...register("costPrice", { required: true })} />
          <p className="error">{errors.costPrice?.message}</p>
        </FormItem>

        <FormItem>
          <input placeholder="Preço de venda" {...register("sellingPrice", { required: true })} />
          <p className="error">{errors.sellingPrice?.message}</p>
        </FormItem>

        <FormItem>
          <input placeholder="Quantidade" {...register("quantity", { required: true })} />
          <p className="error">{errors.quantity?.message}</p>
        </FormItem>

        <FormItem>
          <button>Cadastrar</button>
        </FormItem>
      </FormContainer>
      <ToastContainer />
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
