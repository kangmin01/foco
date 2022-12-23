import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  ContentsWrapper,
  City,
  HoverBottom,
  ContentWrapper,
  HoverContent,
  Icons,
  LikeWrapper,
  TotalLike,
} from './style';
import ImgShawdow from './imgshawdow.png';
import Modal from './../Detailmodal/Modal';
import { HiHeart } from 'react-icons/hi';
import { ImSpoonKnife } from 'react-icons/im';
import { MdLocationOn } from 'react-icons/md';

interface Icontent {
  country: string;
  like: number;
  city: string;
  storeName: string;
  img: string;
  foodType: string[];
  mood: string[];
}

interface Iprops {
  country: string;
}

const Content = (props: Iprops) => {
  const [data, setData] = useState<Icontent[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { country } = props;

  const getPostData = () => {
    return axios({
      method: 'get',
      url: `/post?country=${country}`,
    }).then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      await getPostData();
    };
    fetchData();
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <ContentsWrapper>
      {modalOpen && <Modal closeModal={closeModal} postNum={0} />}
      {data.map((content: Icontent, index: number) => {
        return (
          <ContentWrapper key={index}>
            <HoverContent onClick={openModal}>
              <img src={ImgShawdow} />
              <HoverBottom>
                <City>
                  <MdLocationOn />
                  {content.city}
                </City>
                <Icons>
                  <HiHeart />
                  <ImSpoonKnife />
                </Icons>
              </HoverBottom>
            </HoverContent>
            <img src={content.img} alt={content.storeName}></img>
            <LikeWrapper>
              <HiHeart />
              <TotalLike>{content.like}</TotalLike>
            </LikeWrapper>
          </ContentWrapper>
        );
      })}
    </ContentsWrapper>
  );
};

export default Content;
