import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Menu from './Menu';
import { ROUTE } from '../../Route';
import {
  AccountContainer,
  ContentsBox,
  Title,
  MainContainer,
  DeactivateBox,
  InfoItem,
  Label,
  Input,
  FixedValue,
  Button,
} from './account-style';

const Deactivate = () => {
  const [email, setEmail] = useState<String>();

  const getUserData = async () => {
    const { params }: any = useParams;
    const userNum = sessionStorage.getItem('userNum');

    axios
      .get(`${ROUTE.DEACTIVATE.link}/${userNum}`, { params })
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

  return (
    <AccountContainer>
      <Title>My Account</Title>
      <ContentsBox>
        <Menu />
        <MainContainer>
          <DeactivateBox>
            <InfoItem>
              <Label htmlFor="nickname">
                <p>Email</p>
                <FixedValue>{email}</FixedValue>
              </Label>
            </InfoItem>
            <InfoItem>
              <Label htmlFor="password">
                <p>Password</p>
                <Input type="password" />
              </Label>
            </InfoItem>
          </DeactivateBox>
          <Button>Delete my account</Button>
        </MainContainer>
      </ContentsBox>
    </AccountContainer>
  );
};

export default Deactivate;
