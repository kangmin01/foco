import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { ROUTE } from '../../Route';
import { HiUserCircle, HiShieldCheck, HiCog6Tooth } from 'react-icons/hi2';
import {
  MenuContainer,
  ItemBox,
  UserBox,
  Username,
  ImgBox,
  Img,
  Item,
  Icon,
  MenuBtn,
} from './account-style';

interface inputData {
  name: string;
  img: string;
}

const Menu = () => {
  const [info, setInfo] = useState<inputData>({
    name: '',
    img: '',
  });
  const userNum = localStorage.getItem('userNum');

  useEffect(() => {
    const { params }: any = useParams;
    const getUserData = () => {
      axios
        .get(`${ROUTE.PROFILE.link}/${userNum}`, { params })
        .then((res) => {
          const data = res.data.user;
          setInfo({
            name: data.name,
            img: data.img,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, [userNum]);

  return (
    <MenuContainer>
      <UserBox>
        <ImgBox>
          <Img src={info.img} />
        </ImgBox>
        <Username>{info.name}</Username>
      </UserBox>
      <ItemBox>
        <Item>
          <Icon>
            <HiUserCircle />
          </Icon>
          <MenuBtn>
            <Link to={`${ROUTE.PROFILE.link}/${userNum}`}>Profile</Link>
          </MenuBtn>
        </Item>
        <Item>
          <Icon>
            <HiShieldCheck />
          </Icon>
          <MenuBtn>
            <Link to={`${ROUTE.SECURITY.link}/${userNum}`}>Security</Link>
          </MenuBtn>
        </Item>
        <Item>
          <Icon>
            <HiCog6Tooth />
          </Icon>
          <MenuBtn>
            <Link to={`${ROUTE.DEACTIVATE.link}/${userNum}`}>Deactivate</Link>
          </MenuBtn>
        </Item>
      </ItemBox>
    </MenuContainer>
  );
};

export default Menu;
