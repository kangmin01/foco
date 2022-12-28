import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { validateNickname } from '../util/usefulFunctions';
import Menu from './Menu';
import { FaCamera } from 'react-icons/fa';
import {
  AccountContainer,
  ContentsBox,
  Title,
  MainContainer,
  ProfileBox,
  PhotoBox,
  PhotoInner,
  Photo,
  UploadBtn,
  UploadInput,
  InfoItem,
  Label,
  InputBox,
  Input,
  Errormsg,
  FixedValue,
  CountrySelect,
  Button,
} from './account-style';

interface inputData {
  email: string;
  name: string;
  country: string;
  img: any;
}

const Profile = () => {
  const [info, setInfo] = useState<inputData>({
    email: '',
    name: '',
    country: '',
    img: '',
  });
  const [imgData, setImgData] = useState<any>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const userNum = localStorage.getItem('userNum');

  const getUserData = async () => {
    const { params }: any = useParams;

    await axios
      .get(`user/${userNum}`, { params })
      .then((res) => {
        const data = res.data.user;
        setInfo({
          email: data.email,
          name: data.name,
          country: data.country,
          img: data.img,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCountriesName = async () => {
    const res = await axios.get('http://localhost:4000/Data/worldmap.json');
    setCountries(res.data.objects.world.geometries);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUserData();
      await getCountriesName();
    };
    fetchData();
  }, []);

  const options = countries.map((x) => {
    return {
      value: x.properties.name,
      label: x.properties.name,
    };
  });

  const handleChange = (e: any) => {
    if (e.target.name === 'nickname') {
      if (!validateNickname(e.target.value)) {
        setError('English only');
      } else {
        setError('');
        setInfo((prev) => ({ ...prev, name: e.target.value }));
      }
    } else if (e.target.name === 'country') {
      setInfo((prev) => ({ ...prev, country: e.target.value }));
    }
  };

  const countryChange = (select: any) => {
    setInfo((prev) => ({
      ...prev,
      country: select.value,
    }));
  };

  const insertImg = (e: any) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const previewImgUrl = reader.result;
      if (previewImgUrl) {
        setInfo((prev) => ({
          ...prev,
          img: String(previewImgUrl),
        }));
      }
    };

    setImgData(file);
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('image', imgData);
    console.log(formData);
    if (error === '') {
      axios
        .post('/user/upload', formData)
        .then((res) => {
          const newImg = res.data;
          console.log(newImg);
          const newInfo = {
            name: info.name,
            country: info.country,
            img: newImg,
          };
          console.log(newInfo);
          axios
            .patch(`/user/${userNum}`, newInfo)
            .then((res) => {
              const userName = newInfo.name;
              const userCountry = newInfo.country;
              localStorage.setItem('userName', userName);
              localStorage.setItem('userCountry', userCountry);
              alert('SUCCESS');
              console.log(res);
            })
            .catch((err) => {
              alert('Please Check Your Info');
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('Please Check Your Info');
    }
  };

  return (
    <AccountContainer>
      <Title>My Account</Title>
      <ContentsBox>
        <Menu />
        <MainContainer>
          <ProfileBox>
            <InfoItem>
              <Label htmlFor="photo">
                <p>Photo</p>
                <PhotoBox>
                  <PhotoInner>
                    <Photo src={info.img} />
                  </PhotoInner>
                  <form encType="multipart/form-data">
                    <UploadInput
                      type="file"
                      id="file"
                      name="avatar"
                      accept="image/*"
                      onChange={insertImg}
                    />
                    <UploadBtn htmlFor="file">
                      <FaCamera />
                    </UploadBtn>
                  </form>
                </PhotoBox>
              </Label>
            </InfoItem>
            <InfoItem>
              <Label htmlFor="email">
                <p>Email</p>
                <FixedValue>{info.email}</FixedValue>
              </Label>
            </InfoItem>
            <InfoItem>
              <Label htmlFor="nickname">
                <p>Nickname</p>
                <InputBox>
                  <Input
                    type="text"
                    name="nickname"
                    placeholder={info.name}
                    onChange={handleChange}
                  />
                  <Errormsg>
                    <p>{error}</p>
                  </Errormsg>
                </InputBox>
              </Label>
            </InfoItem>
            <InfoItem>
              <Label htmlFor="country">
                <p>Country</p>
                <CountrySelect>
                  <Select
                    name="country"
                    placeholder={info.country}
                    options={options}
                    onChange={countryChange}
                  />
                </CountrySelect>
              </Label>
            </InfoItem>
          </ProfileBox>
          <Button type="submit" onClick={handleSubmit}>
            Save Changes
          </Button>
        </MainContainer>
      </ContentsBox>
    </AccountContainer>
  );
};

export default Profile;
