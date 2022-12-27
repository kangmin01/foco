import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { validatePassword } from '../util/usefulFunctions';
import Menu from './Menu';
import { ROUTE } from '../../Route';
import {
  AccountContainer,
  ContentsBox,
  Title,
  MainContainer,
  SecurityBox,
  InfoItem,
  Label,
  Input,
  InputBox,
  Errormsg,
  FixedValue,
  Button,
} from './account-style';

interface inputData {
  password: string;
}

interface errorData {
  passwordError: string;
  confirmPasswordError: string;
}

const Security = () => {
  const [info, setInfo] = useState<inputData>({
    password: '',
  });

  const [error, setError] = useState<errorData>({
    passwordError: '',
    confirmPasswordError: '',
  });

  const validateConfirmPassword = (password: string) => {
    return password === info.password;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'password') {
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

  const [email, setEmail] = useState<String>();

  const getUserData = async () => {
    const { params }: any = useParams;
    const userNum = sessionStorage.getItem('userNum');

    axios
      .get(`${ROUTE.SECURITY.link}/${userNum}`, { params })
      .then((res) => {
        const data = res.data.user;
        setEmail(data.email);
        console.log(res.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUserData();
    };
    fetchData();
  }, [email]);

  const handleSubmit = () => {
    if (error.passwordError === '' && error.confirmPasswordError === '') {
      alert('비밀번호 변경 성공');
      console.log(info);
    } else {
      alert('내용확인!');
    }
  };

  return (
    <AccountContainer>
      <Title>My Account</Title>
      <ContentsBox>
        <Menu />
        <MainContainer>
          <SecurityBox>
            <InfoItem>
              <Label htmlFor="nickname">
                <p>Email</p>
                <FixedValue>{email}</FixedValue>
              </Label>
            </InfoItem>
            <InfoItem>
              <Label htmlFor="password">
                <p>Password</p>
                <InputBox>
                  <Input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="New password"
                  />
                  <Errormsg>
                    <p>{error.passwordError}</p>
                  </Errormsg>
                </InputBox>
              </Label>
            </InfoItem>
            <InfoItem>
              <Label htmlFor="confirm-password">
                <p>Confirm Password</p>
                <InputBox>
                  <Input
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    placeholder="confirm password"
                  />
                  <Errormsg>
                    <p>{error.confirmPasswordError}</p>
                  </Errormsg>
                </InputBox>
              </Label>
            </InfoItem>
          </SecurityBox>
          <Button type="submit" onClick={handleSubmit}>
            Save Changes
          </Button>
        </MainContainer>
      </ContentsBox>
    </AccountContainer>
  );
};

export default Security;
