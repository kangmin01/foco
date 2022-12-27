import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ROUTE } from '../../Route';
import Select from 'react-select';
import { FaGoogle } from 'react-icons/fa';
import {
  validateNickname,
  validateEmail,
  validatePassword,
} from '../util/usefulFunctions';
import {
  RegisterContainer,
  InnerBox,
  Greeting,
  Form,
  Nickname,
  Email,
  Password,
  ConfirnPassword,
  Errormsg,
  CountrySelect,
  SubmitBtn,
  SocialLoin,
  GoogleBtn,
  Border,
} from './register-style';

interface userData {
  name: string;
  email: string;
  password: string;
  country: string;
}

interface errorData {
  nameError: string;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
  countryError: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState<any[]>([]);
  const [info, setInfo] = useState<userData>({
    name: '',
    email: '',
    password: '',
    country: '',
  });

  const [error, setError] = useState<errorData>({
    nameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
    countryError: '',
  });

  const validateConfirmPassword = (password: string) => {
    return password === info.password;
  };

  useEffect(() => {
    const getCountriesName = async () => {
      await axios
        .get('http://localhost:4000/Data/worldmap.json')
        .then((res) => setCountries(res.data.objects.world.geometries));
    };
    getCountriesName();
  }, []);

  const options = countries.map((x) => {
    return {
      value: x.properties.name,
      label: x.properties.name,
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'name') {
      if (!validateNickname(e.target.value)) {
        setError((prev) => ({
          ...prev,
          nameError: 'English only',
        }));
      } else {
        setError((prev) => ({
          ...prev,
          nameError: '',
        }));
        setInfo((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      }
    } else if (e.target.name === 'email') {
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
    } else if (e.target.name === 'confirmPassword') {
      if (!validateConfirmPassword(e.target.value)) {
        setError((prev) => ({
          ...prev,
          confirmPasswordError: 'Passwords do not match',
        }));
      } else {
        setError((prev) => ({
          ...prev,
          confirmPasswordError: '',
        }));
      }
    }
  };

  const countryChange = (select: any) => {
    setInfo((prev) => ({
      ...prev,
      country: select.value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      error.nameError === '' &&
      error.emailError === '' &&
      error.passwordError === '' &&
      error.confirmPasswordError === '' &&
      error.countryError === '' &&
      info.name !== '' &&
      info.email !== '' &&
      info.password !== '' &&
      info.country !== ''
    ) {
      axios
        .post('/user/register', info)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
      alert('WELCOME');
      navigate(`${ROUTE.LOGIN.link}`);
    } else {
      alert('FAILED');
    }
  };

  return (
    <RegisterContainer>
      <InnerBox>
        <Greeting>Welocome!</Greeting>
        <Form>
          <Nickname
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="name"
          />
          <Errormsg>
            <p>{error.nameError}</p>
          </Errormsg>
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
          <ConfirnPassword
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="confirm password"
          />
          <Errormsg>
            <p>{error.confirmPasswordError}</p>
          </Errormsg>
          <CountrySelect>
            <Select
              name="country"
              placeholder="Select your country"
              options={options}
              onChange={countryChange}
            />
          </CountrySelect>
          <Errormsg>
            <p>{error.countryError}</p>
          </Errormsg>
        </Form>
        <SubmitBtn type="submit" onClick={handleSubmit}>
          Register
        </SubmitBtn>
        <Border>OR</Border>
        <SocialLoin>
          <GoogleBtn>
            <FaGoogle />
            <span>Login with Google</span>
          </GoogleBtn>
        </SocialLoin>
      </InnerBox>
    </RegisterContainer>
  );
};
export default Register;
