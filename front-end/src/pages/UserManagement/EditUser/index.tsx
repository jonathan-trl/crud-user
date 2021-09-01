import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";
import IUser from "../../../models/User";
import UserService from "../../../services/UserService";
import {
  Body,
  Container,
  FormWrapper,
  Header,
  HeaderTitle,
  Input,
  InputWrapper,
  Label,
  LoaderWrapper,
} from "../styles";

const User = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<IUser>();

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const notify = (message: string) => toast(message);

  const disableBtn = () => {
    setDisabled(true);

    setTimeout(() => {
      setDisabled(false);
    }, 2000);
  };

  const redirect = () => {
    history.push("/");
  };

  const getUser = async () => {
    const response = await UserService.findById(id);

    if (response.status === 400) {
      notify("Usuário não encontrado");
      setDisabled(true);
      setTimeout(() => {
        redirect();
      }, 2000);
    }
    setUser(response);
  };

  useEffect(() => {
    getUser();
  }, []);

  const editUser = async (data: IUser) => {
    disableBtn();

    if (data.name === "" || data.username === "" || data.password === "") {
      notify("Os dados não podem estar vazios");
      return;
    }

    setLoading(true);
    const response = await UserService.update(id, data);
    setLoading(false);

    notify(response.message);

    setTimeout(() => {
      redirect();
    }, 2000);
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>Editar usuário</HeaderTitle>
      </Header>
      <Body>
        {user && (
          <>
            <FormWrapper onSubmit={handleSubmit(editUser)}>
              <InputWrapper>
                <Label>Nome:</Label>
                <Input
                  {...register("name")}
                  autoComplete="off"
                  defaultValue={user.name}
                />
              </InputWrapper>
              <InputWrapper>
                <Label>Nome de usuário:</Label>
                <Input
                  {...register("username")}
                  autoComplete="off"
                  defaultValue={user.username}
                />
              </InputWrapper>
              <InputWrapper>
                <Label>Senha:</Label>
                <Input
                  {...register("password")}
                  autoComplete="off"
                  defaultValue={user.password}
                />
              </InputWrapper>
              <InputWrapper>
                <Input type="submit" value="Editar" disabled={disabled} />
              </InputWrapper>
            </FormWrapper>
            <LoaderWrapper>
              <ClipLoader loading={loading} />
            </LoaderWrapper>
          </>
        )}
      </Body>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        closeOnClick
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </Container>
  );
};

export default User;
