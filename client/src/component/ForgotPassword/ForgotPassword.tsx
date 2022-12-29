import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { InfoAlert, SuccessAlert } from '../util/alert';
import { validateEmail } from '../util/usefulFunctions';
import {
  ForgotPasswordContainer,
  InnerBox,
  TextBox,
  Title,
  SubTxt,
  Form,
  Email,
  Errormsg,
  SubmitBtn,
} from './ForgotPassword-style';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<String>('');
  const [error, setError] = useState<String>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      if (!validateEmail(e.target.value)) {
        setError('This is not a valid email');
      } else {
        setError('');
        setEmail(e.target.value);
      }
    }
  };

  const handleSubmit = () => {
    if (error === '' && email !== '') {
      axios
        .post('/user/pwInit', { email: email })
        .then((res) => {
          console.log(res);
          InfoAlert('Please check your email.');
          navigate('/login');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      SuccessAlert('This is not a valid email');
    }
  };

  return (
    <ForgotPasswordContainer>
      <InnerBox>
        <TextBox>
          <Title>Forgot Password?</Title>
          <SubTxt>
            Please enter your email address. You will receive a new password via
            email.
          </SubTxt>
        </TextBox>
        <Form>
          <Email
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="example@email.com"
          />
          <Errormsg>
            <p>{error}</p>
          </Errormsg>
        </Form>
        <SubmitBtn type="submit" onClick={handleSubmit}>
          Send
        </SubmitBtn>
      </InnerBox>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
