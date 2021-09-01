import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div``;

export const HeaderTitle = styled.h1``;

export const AddUserWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AddUserTitle = styled.h2``;

export const FormWrapper = styled.form`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const LoaderWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 1000px) {
    width: 100%;
    justify-content: center;
    margin: 10px 0;
  }
`;

export const Label = styled.label`
  margin-right: 20px;
`;

export const Input = styled.input``;

export const Body = styled.div``;

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const User = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

export const UserDataWrapper = styled.div`
  @media screen and (max-width: 700px) {
    width: 100%;
    margin: 20px 0;
    text-align: center;
  }
`;

export const UserDelete = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 700px) {
    width: 100%;
    margin: 20px 0;
    text-align: center;
  }
`;

export const BtnDelete = styled.button``;
