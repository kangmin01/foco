import {
  ModalBackground,
  ModalWrapper,
  TitleWrapper,
  Box,
  TitleBox,
  TitleBlock,
  Info,
  StoreName,
  Title,
  IconsWrapper,
  Icons,
  ImgBox,
  Content,
  TagBox,
  TextBox,
  Profile,
  StoreInfo,
  CloseIcon,
} from './style';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaUtensilSpoon } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import ScrollHorizontal from 'react-scroll-horizontal';
import { Icontent } from '../Icontent';

interface Iprops {
  // postNum: number;
  closeModal: () => void;
}

const Modal = (props: Iprops) => {
  const [data, setData] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState<string>('pink');
  const onIncrease = () => setCount(count + 1);
  const onDecrease = () => setCount(count - 1);

  // mock data 연결
  const getData = () => {
    return axios({
      method: 'get',
      url: `http://localhost:4000/Data/detailPost.json`,
      // url: `/post/${props.postNum}`,
      //url: `/post/12`,
      //
    }).then((res) => {
      console.log(res);
      setData(res.data.data);
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, []);

  const clickHeart = () => {
    if (color === 'pink') {
      setColor('red');
      onIncrease();
    } else {
      setColor('pink');
      onDecrease();
    }
  };

  return (
    <ModalBackground>
      {data.map((content: Icontent, index: number) => {
        return (
          <ModalWrapper key={index}>
            <TitleWrapper>
              <IconsWrapper>
                <Icons>
                  <AiFillHeart
                    className="logo"
                    color={color}
                    onClick={clickHeart}
                  />
                  &nbsp;
                  {content.like}
                  <FaUtensilSpoon className="spoon" />
                </Icons>
                <CloseIcon>
                  <IoClose onClick={props.closeModal} />
                </CloseIcon>
              </IconsWrapper>
              <TitleBox>
                <StoreInfo>
                  <TitleBlock>l</TitleBlock>
                  <Title>
                    <StoreName>{content.storeName}</StoreName>
                    <Info>{content.address}</Info>
                    <Info>{content.grade}</Info>
                  </Title>
                </StoreInfo>
                <Profile
                  src={content.profile}
                  alt={content.storeName}
                ></Profile>
              </TitleBox>
            </TitleWrapper>
            <Box>
              <ImgBox>
                <ScrollHorizontal>
                  {content.img.map((img: any) => {
                    return <img src={img} alt={content.storeName}></img>;
                  })}
                </ScrollHorizontal>
              </ImgBox>
              <Content>
                <TagBox>
                  {content.mood}&nbsp;
                  {content.food}&nbsp;
                </TagBox>
                <TextBox>{content.review}</TextBox>
              </Content>
            </Box>
          </ModalWrapper>
        );
      })}
    </ModalBackground>
  );
};

export default Modal;
