import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ROUTE } from '../../Route';
import { Cookies } from 'react-cookie';
import { FaGoogle } from 'react-icons/fa';
import { validateEmail, validatePassword } from '../util/usefulFunctions';
import {
  LoginContainer,
  InnerBox,
  Greeting,
  Form,
  Email,
  Password,
  Errormsg,
  ForgotPassword,
  SubmitBtn,
  Register,
  SocialLoin,
  GoogleBtn,
  Border,
} from './login-style';

interface inputData {
  email: string;
  password: string;
}

interface errorData {
  emailError: string;
  passwordError: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState<inputData>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<errorData>({
    emailError: '',
    passwordError: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      if (!validateEmail(e.target.value)) {
        setError((prev) => ({
          ...prev,
          emailError: 'This is not a valid email',
        }));
      } else {
        setError((prev) => ({
          ...prev,
          emailError: '',
        }));
        setInfo((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      }
    } else if (e.target.name === 'password') {
      if (!validatePassword(e.target.value)) {
        setError((prev) => ({
          ...prev,
          passwordError: 'Must be at 8 characters',
        }));
      } else {
        setError((prev) => ({
          ...prev,
          passwordError: '',
        }));
        setInfo((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      }
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      error.emailError === '' &&
      error.passwordError === '' &&
      info.email !== '' &&
      info.password !== ''
    ) {
      axios
        .post('/api/user/login', info)
        .then((res) => {
          const cookies = new Cookies();
          const token = res.data.user.refreshToken;
          const userNum = res.data.user.user.userNum;
          const userName = res.data.user.user.name;
          const userCountry = res.data.user.user.country;
          cookies.set('token', token);
          localStorage.setItem('userNum', userNum);
          localStorage.setItem('userName', userName);
          localStorage.setItem('userCountry', userCountry);
          alert('Success Login!');
          navigate(`${ROUTE.HOME.link}`);
        })
        .catch((error) => {
          console.log(error);
          alert('Please Check Your Email or Password!');
        });
    } else {
      alert('Please Check Your Email or Password!');
    }
  };

  return (
    <LoginContainer>
      <InnerBox>
        <Greeting>Hello!</Greeting>
        <Form>
          <Email
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="example@email.com"
          />
          <Errormsg>
            <p>{error.emailError}</p>
          </Errormsg>
          <Password
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="password"
          />
          <Errormsg>
            <p>{error.passwordError}</p>
          </Errormsg>
          <ForgotPassword>
            <Link to={'/forgotpassword'}>Forgot Password</Link>
          </ForgotPassword>
        </Form>
        <SubmitBtn type="submit" onClick={handleSubmit}>
          Log in
        </SubmitBtn>
        <Register>
          Don't have an account?{' '}
          <span>
            <Link to={'/register'}>Register</Link>
          </span>
        </Register>
        <Border>OR</Border>
        <SocialLoin>
          <GoogleBtn>
            <FaGoogle />
            <span>Login with Google</span>
          </GoogleBtn>
        </SocialLoin>
      </InnerBox>
    </LoginContainer>
  );
};

export default Login;
