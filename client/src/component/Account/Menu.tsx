import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
  email: string;
  name: string;
  country: string;
  img: string;
}

const Menu = () => {
  const [info, setInfo] = useState<inputData>({
    email: '',
    name: '',
    country: '',
    img: '',
  });

  const getUserData = async () => {
    const res = await axios.get('http://localhost:4000/Data/user.json');
    setInfo(res.data[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUserData();
    };
    fetchData();
  }, []);

  return (
    <MenuContainer>
      <UserBox>
        <ImgBox>
          <Img src={info.img} />
        </ImgBox>
        <Username>kailey</Username>
      </UserBox>
      <ItemBox>
        <Item>
          <Icon>
            <HiUserCircle />
          </Icon>
          <MenuBtn>
            <Link to={'/account/profile'}>Profile</Link>
          </MenuBtn>
        </Item>
        <Item>
          <Icon>
            <HiShieldCheck />
          </Icon>
          <MenuBtn>
            <Link to={'/account/security'}>Security</Link>
          </MenuBtn>
        </Item>
        <Item>
          <Icon>
            <HiCog6Tooth />
          </Icon>
          <MenuBtn>
            <Link to={'/account/deactivate'}>Deactivate</Link>
          </MenuBtn>
        </Item>
      </ItemBox>
    </MenuContainer>
  );
};

export default Menu;
