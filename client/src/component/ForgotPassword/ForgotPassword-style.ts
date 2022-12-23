import styled from 'styled-components';
import '../../GlobalStyle';

export const ForgotPasswordContainer = styled.div`
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

export const TextBox = styled.div`
  margin-bottom: 60px;
  padding: 0 40px;
  text-align: left;
`;

export const Title = styled.h2`
  margin: 0 0 30px 0;
  font-family: 'Rubik Spray Paint', cursive;
  font-size: 32px;
  font-weight: 100;
`;

export const SubTxt = styled.p`
  font-size: 18px;
  text-align: left;
  line-height: 26px;
  color: #828282;
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
  margin-bottom: 40px;
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
