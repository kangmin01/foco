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

interface userData {
  email: string;
  password: string;
  newPassword: string;
  newPassword2: string;
}

interface errorData {
  passwordError: string;
  confirmPasswordError: string;
}

const Security = () => {
  const [userData, setUserData] = useState<userData>({
    email: '',
    password: '',
    newPassword: '',
    newPassword2: '',
  });

  const [error, setError] = useState<errorData>({
    passwordError: '',
    confirmPasswordError: '',
  });

  const validateConfirmPassword = (password: string) => {
    return password === userData.newPassword;
  };

  useEffect(() => {
    const getUserData = async () => {
      const { params }: any = useParams;
      const userNum = localStorage.getItem('userNum');

      axios
        .get(`${ROUTE.PROFILE.link}/${userNum}`, { params })
        .then((res) => {
          const data = res.data.user;
          setUserData((prev) => ({
            ...prev,
            email: data.email,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, []);

  console.log(userData);

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
        setUserData((prev) => ({
          ...prev,
          newPassword: e.target.value,
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
        setUserData((prev) => ({
          ...prev,
          newPassword2: e.target.value,
        }));
      }
    } else if (e.target.name === 'currentPassword') {
      setUserData((prev) => ({
        ...prev,
        password: e.target.value,
      }));
    }
  };

  const handleSubmit = () => {
    if (error.passwordError !== '') {
      alert(error.passwordError);
    } else if (error.confirmPasswordError !== '') {
      alert(error.confirmPasswordError);
    } else {
      axios
        .patch('/user/password', userData)
        .then((res) => {
          alert('Password Changed!');
          console.log(res);
        })
        .catch((err) => {
          alert('Please Check Your Password');
          console.log(err);
        });
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
                <FixedValue>{userData.email}</FixedValue>
              </Label>
            </InfoItem>
            <InfoItem>
              <Label htmlFor="password">
                <p>Current Password</p>
                <InputBox>
                  <Input
                    type="password"
                    name="currentPassword"
                    onChange={handleChange}
                    placeholder="Current password"
                  />
                  <Errormsg>
                    <p>{}</p>
                  </Errormsg>
                </InputBox>
              </Label>
            </InfoItem>
            <InfoItem>
              <Label htmlFor="password">
                <p>New Password</p>
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
