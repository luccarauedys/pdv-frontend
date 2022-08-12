import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, FormContainer } from "./styles";
import { signIn } from "../../services/api";
import { ToastContainer } from "react-toastify";
import { notifyError } from "../../utils/toasts";

const schema = yup
  .object({
    email: yup.string().email("Digite um email válido").required("O email de acesso é obrigatório"),
    password: yup.string().required("A senha de acesso é obrigatória"),
  })
  .required();

export function SignIn() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (loginData) => {
    try {
      const response = await signIn(loginData);
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/home");
    } catch (error) {
      if (error.response.data) notifyError(error.response.data);
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/home");
  }, []);

  return (
    <Container>
      <img
        src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4ca.svg"
        width={"100px"}
      />
      <h1>Gerencie agora suas vendas!</h1>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <label>
          Email de acesso:
          <input type="text" {...register("email", { required: true })} />
          <p className="error">{errors.email?.message}</p>
        </label>
        <label>
          Senha de acesso:
          <input type="password" {...register("password", { required: true })} />
          <p className="error">{errors.password?.message}</p>
        </label>
        <button>Logar</button>
        <Link to="/signup">Não possui uma conta? Faça o cadastro!</Link>
      </FormContainer>
      <ToastContainer />
    </Container>
  );
}
