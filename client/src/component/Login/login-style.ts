import styled from 'styled-components';
import '../../GlobalStyle';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 20px;
  padding: 20px;
  width: 460px;
  height: 630px;
  border-radius: 30px;
  box-shadow: 10px 10px 20px 4px #dfdfdf;
  text-align: center;
`;

export const InnerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Greeting = styled.h2`
  margin: 30px 0 50px 0;
  font-family: 'Rubik Spray Paint', cursive;
  font-size: 50px;
  font-weight: 100;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 0;
  border-bottom: 1px solid #d9d9d9;
  font-size: 18px;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #b3b3b3;
    font-size: 18px;
  }
`;

export const Email = styled(Input)`
  margin-bottom: 15px;
`;

export const Password = styled(Input)`
  margin-bottom: 15px;
`;

export const Errormsg = styled.div`
  align-self: flex-start;
  height: 20px;

  & > p {
    text-align: right;
    font-size: 13px;
    font-weight: 600;
    color: #f05757;
  }
`;

export const ForgotPassword = styled.p`
  align-self: flex-end;
  margin: 16px 0;
  text-align: right;
  font-weight: 600;
  color: #212121;

  & > a {
    all: unset;
  }

  &:hover {
    color: var(--primary-color);
    cursor: pointer;
  }
`;

export const SubmitBtn = styled.button`
  all: unset;
  width: 80%;
  height: 50px;
  border-radius: 30px;
  background-color: var(--primary-color);
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background-color: var(--secondary-color);
    color: #000000;
  }
`;

export const Register = styled.p`
  margin-top: 24px;
  color: #b3b3b3;

  & > span {
    font-weight: bold;
    color: #212121;
  }
  &>span: hover {
    color: var(--primary-color);
    cursor: pointer;
  }
  & > span > a {
    all: unset;
  }
`;

export const SocialLoin = styled.div`
  width: 100%;
`;

export const GoogleBtn = styled(SubmitBtn)`
  border: 2px solid var(--secondary-color);
  background-color: white;
  color: #000000;
  & > span {
    margin-left: 10px;
  }
  &:hover {
    border: 2px solid var(--primary-color);
    background-color: white;
  }
`;

export const Border = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0px;
  width: 80%;
  color: #b3b3b3;
  font-size: 12px;

  &::before {
    content: '';
    flex-grow: 1;
    background: #d9d9d9;
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0 16px;
  }

  &::after {
    content: '';
    flex-grow: 1;
    background: #d9d9d9;
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0 16px;
  }
`;
