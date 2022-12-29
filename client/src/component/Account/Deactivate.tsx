import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import { InfoAlert, SuccessAlert } from '../util/alert';
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

interface inputData {
  email: string;
  password: string;
}

const Deactivate = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const userNum = localStorage.getItem('userNum');
  const [info, setInfo] = useState<inputData>({
    email: '',
    password: '',
  });

  useEffect(() => {
    const { params }: any = useParams;
    const getUserData = async () => {
      await axios
        .get(`http://kdt-sw3-team11.elicecoding.com/api/user/${userNum}`, {
          params,
        })
        .then((res) => {
          const data = res.data.user;
          setInfo((prev) => ({
            ...prev,
            email: data.email,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, [userNum]);

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const handleDelete = () => {
    const primary = '#517DA6';
    const red = '#F05757';

    Swal.fire({
      title: 'Are you sure you want to delete your account?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: primary,
      cancelButtonColor: red,
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire({ title: 'Changed!', icon: 'success' });
        axios
          .delete('http://kdt-sw3-team11.elicecoding.com/api/user', {
            data: info,
          })
          .then((res) => {
            cookies.remove('token', { path: '/' });
            localStorage.clear();
            SuccessAlert('Delete Your Account');
            navigate(`${ROUTE.HOME.link}`);
          })
          .catch((err) => {
            InfoAlert('Please Check Your Password');
            console.log(err);
          });
      } else {
        InfoAlert('Canceled');
      }
    });
  };

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
                <FixedValue>{info.email}</FixedValue>
              </Label>
            </InfoItem>
            <InfoItem>
              <Label htmlFor="password">
                <p>Password</p>
                <Input type="password" onChange={handleChangePassword} />
              </Label>
            </InfoItem>
          </DeactivateBox>
          <Button onClick={handleDelete}>Delete my account</Button>
        </MainContainer>
      </ContentsBox>
    </AccountContainer>
  );
};

export default Deactivate;
