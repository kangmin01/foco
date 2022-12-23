import { setegid } from 'process';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { validateEmail, validatePassword } from '../util/usefulFunctions';
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
      alert('임시 비밀번호 전송!');
    } else {
      alert('내용확인!');
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
