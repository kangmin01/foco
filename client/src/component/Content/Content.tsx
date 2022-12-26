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
import { Icontent } from '../Icontent';

interface Iprops {
  country: string;
}

const Content = (props: Iprops) => {
  const [contents, setContents] = useState<Icontent[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { country } = props;
  const [postNum, setPostNum] = useState<number>(0);

  const getPostContents = () => {
    return axios({
      method: 'get',
      url: `/post?country=${country}`,
    }).then((res) => {
      setContents(res.data);
    });
  };
  useEffect(() => {
    const fetchContents = async () => {
      await getPostContents();
    };
    fetchContents();
  }, []);

  const openModal = (postNum: number) => {
    setModalOpen(true);
    setPostNum(postNum);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <ContentsWrapper>
      {modalOpen && <Modal postNum={postNum} closeModal={closeModal} />}
      {contents.map((content: Icontent, index: number) => {
        return (
          <ContentWrapper key={index}>
            <HoverContent
              onClick={() => {
                openModal(content.postNum);
              }}
            >
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
            <img src={content.img[0]} alt={content.storeName}></img>
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
