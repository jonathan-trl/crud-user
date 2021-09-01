import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IUser from "../../models/User";
import UserService from "../../services/UserService";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Header,
  HeaderTitle,
  Body,
  UserWrapper,
  User,
  UserDelete,
  BtnDelete,
  AddUserWrapper,
  FormWrapper,
  Input,
  AddUserTitle,
  InputWrapper,
  Label,
  UserDataWrapper,
  LoaderWrapper,
} from "./styles";
import { Link } from "react-router-dom";

const UserManagement = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const notify = (message: string) => toast(message);

  const disableBtn = () => {
    setDisabled(true);

    setTimeout(() => {
      setDisabled(false);
    }, 2000);
  };

  const newUsers = async () => {
    const response = await UserService.get();

    setUsers(response);
  };

  useEffect(() => {
    newUsers();
  }, []);

  const deleteUser = async (id: string) => {
    disableBtn();

    setLoading(true);
    const response = await UserService.delete(id);
    setLoading(false);

    notify(response.message);

    newUsers();
  };

  const addUser = async (data: IUser) => {
    disableBtn();

    if (data.name === "" || data.username === "" || data.password === "") {
      notify("Os dados não podem estar vazios");
      return;
    }

    setLoading(true);
    const response = await UserService.store(data);
    setLoading(false);

    notify(response.message);

    reset();

    newUsers();
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>Usuários</HeaderTitle>
        <AddUserWrapper>
          <AddUserTitle>Adicionar usuários</AddUserTitle>
          <FormWrapper onSubmit={handleSubmit(addUser)}>
            <InputWrapper>
              <Label>Nome:</Label>
              <Input {...register("name")} autoComplete="off" />
            </InputWrapper>
            <InputWrapper>
              <Label>Nome de usuário:</Label>
              <Input {...register("username")} autoComplete="off" />
            </InputWrapper>
            <InputWrapper>
              <Label>Senha:</Label>
              <Input {...register("password")} autoComplete="off" />
            </InputWrapper>
            <InputWrapper>
              <Input type="submit" value="Adicionar" disabled={disabled} />
            </InputWrapper>
          </FormWrapper>
          <LoaderWrapper>
            <ClipLoader loading={loading} />
          </LoaderWrapper>
        </AddUserWrapper>
      </Header>
      <Body>
        <UserWrapper>
          {users.map((user, key) => {
            return (
              <User key={key}>
                <UserDataWrapper>#{key + 1}</UserDataWrapper>
                <UserDataWrapper>Nome: {user.name}</UserDataWrapper>
                <UserDataWrapper>
                  Nome de usuário: {user.username}
                </UserDataWrapper>
                <UserDataWrapper>Senha: {user.password}</UserDataWrapper>
                <UserDelete>
                  <BtnDelete
                    onClick={() => deleteUser(user._id)}
                    disabled={disabled}
                  >
                    Deletar
                  </BtnDelete>
                  <Link to={`/user/${user._id}`}>Editar</Link>
                </UserDelete>
              </User>
            );
          })}
        </UserWrapper>
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

export default UserManagement;
