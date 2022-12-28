import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  RankingWrapper,
  Header,
  Title,
  Button,
  MoreButton,
  Number,
  ContentBox,
  Left,
  Like,
  StoreName,
  TotalLike,
} from './style';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { HiHeart } from 'react-icons/hi';
import { MdZoomOutMap } from 'react-icons/md';
import { Icontent } from '../Icontent';
import Modal from './../Detailmodal/Modal';

interface Iprops {
  country: string;
  closeModal: () => void;
  showWholeMap: () => void;
  changeFill: (city: string) => void;
}

const Ranking = (props: Iprops) => {
  const { country, closeModal, showWholeMap, changeFill } = props;
  const [data, setData] = useState<any[]>([]);
  const [contentModalOpen, setContentModalOpen] = useState<boolean>(false);
  const [postNum, setPostNum] = useState<number>(0);
  const [like, setLike] = useState<number>(0);

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
  }, [like]);

  useEffect(() => {
    const fetchData = async () => {
      await getPostData();
    };
    fetchData();
  }, [country]);

  const openCotentModal = (postNum: number) => {
    setContentModalOpen(true);
    setPostNum(postNum);
  };

  const closeContentModal = () => {
    setContentModalOpen(false);
  };

  return (
    <RankingWrapper>
      {contentModalOpen && (
        <Modal
          postNum={postNum}
          closeModal={closeContentModal}
          like={like}
          setLike={setLike}
        />
      )}
      <Header>
        <Title>{country}</Title>
        <Button
          className="closeBtn"
          onClick={() => {
            closeModal();
            showWholeMap();
          }}
        >
          <IoCloseCircleOutline />
        </Button>
      </Header>
      <Link to={`/${country}`}>
        <MoreButton>more</MoreButton>
      </Link>
      {data.map((content: Icontent, index: number) => {
        return (
          <ContentBox
            key={index}
            onClick={() => {
              changeFill(content.city);
            }}
          >
            <Left>
              <div>
                <Number>{index + 1}</Number>
                <Like>
                  <HiHeart />
                  <TotalLike>{content.likeUsers.length}</TotalLike>
                </Like>
              </div>
              <StoreName>{content.storeName}</StoreName>
            </Left>
            <img src={content.img[0]} alt={content.storeName}></img>
            <MdZoomOutMap
              onClick={() => {
                openCotentModal(content.postNum);
              }}
              className="openButton"
            />
          </ContentBox>
        );
      })}
    </RankingWrapper>
  );
};

export default Ranking;
