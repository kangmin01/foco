import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CookiesProvider, Cookies } from 'react-cookie';
import { HiUser } from 'react-icons/hi2';
import { MdOutlineLanguage } from 'react-icons/md';
import { ImSpoonKnife } from 'react-icons/im';
import { FaPen, FaCog, FaSignInAlt, FaPowerOff, FaKey } from 'react-icons/fa';
import { HeaderWrapper, Title, Icons, UserBox, MenuBox, Menu } from './style';

const Header = () => {
  const [show, setShow] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const cookies = new Cookies();
  const getCookie = (name: any) => {
    return cookies.get(name);
  };
  const cookie = getCookie('token');

  useEffect(() => {
    if (cookie !== undefined) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [cookie]);

  const LoginMenu = () => {
    return (
      <MenuBox>
        <Link to={'/login'}>
          <Menu>
            <FaPowerOff />
            <span>Log in</span>
          </Menu>
        </Link>
        <Link to={'/register'}>
          <Menu>
            <FaKey />
            <span>Register</span>
          </Menu>
        </Link>
      </MenuBox>
    );
  };

  const UserMenu = () => {
    const handleLogout = () => {
      cookies.remove('token');
      sessionStorage.removeItem('userNum');
      setIsLogin(false);
    };

    const cookies = new Cookies();
    const userNum = sessionStorage.getItem('userNum');

    return (
      <MenuBox>
        <Link to={'/review'}>
          <Menu>
            <FaPen />
            <span>My Review</span>
          </Menu>
        </Link>
        <Link to={`user/profile/${userNum}`}>
          <Menu>
            <FaCog />
            <span>Account</span>
          </Menu>
        </Link>
        <Link to={'/login'}>
          <Menu onClick={handleLogout}>
            <FaSignInAlt />
            <span>Log out</span>
          </Menu>
        </Link>
      </MenuBox>
    );
  };

  return (
    <CookiesProvider>
      <HeaderWrapper>
        <Link to={'/'}>
          <Title>FoCo</Title>
        </Link>
        <Icons>
          <Link to={'/'}>
            <MdOutlineLanguage />
          </Link>
          <UserBox
            onMouseOver={() => setShow(true)}
            onMouseOut={() => setShow(false)}
          >
            <HiUser />
            {show ? isLogin ? <UserMenu /> : <LoginMenu /> : null}
          </UserBox>
          <Link to={'/bookmark'}>
            <ImSpoonKnife />
          </Link>
        </Icons>
      </HeaderWrapper>
    </CookiesProvider>
  );
};

export default Header;
