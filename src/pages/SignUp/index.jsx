import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, FormContainer } from "../SignIn/styles";
import { signUp } from "../../services/api";
import { ToastContainer } from "react-toastify";
import { notifyError } from "../../utils/toasts";

const schema = yup
  .object({
    name: yup.string().required("O nome da empresa é obrigatório"),
    email: yup.string().email("Digite um email válido").required("O email de acesso é obrigatório"),
    password: yup
      .string()
      .min(4, "A senha deve possuir pelo menos 4 caracteres")
      .required("A senha é obrigatória"),
    confirmPassword: yup
      .string()
      .required("Confirmar a senha é obrigatório")
      .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
  })
  .required();

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (signUpData) => {
    delete signUpData.confirmPassword;
    try {
      await signUp(signUpData);
      navigate("/");
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
          Nome da empresa:
          <input type="text" {...register("name", { required: true })} />
          <p className="error">{errors.name?.message}</p>
        </label>
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
        <label>
          Confirme a senha:
          <input type="password" {...register("confirmPassword", { required: true })} />
          <p className="error">{errors.confirmPassword?.message}</p>
        </label>
        <button>Cadastrar empresa</button>
        <Link to="/">Já possui uma conta? Faça login!</Link>
      </FormContainer>
      <ToastContainer />
    </Container>
  );
}
