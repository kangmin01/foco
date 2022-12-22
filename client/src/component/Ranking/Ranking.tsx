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

interface Iprops {
  country: string;
  closeModal: () => void;
  showWholeMap: () => void;
  changeFill: (city: string) => void;
}

interface Icontent {
  country: string;
  like: number;
  storeName: string;
  img: string;
  city: string;
}

const Ranking = (props: Iprops) => {
  const { country, closeModal, showWholeMap, changeFill } = props;
  const [data, setData] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const getPostData = () => {
    return axios({
      method: 'get',
      url: `/post?country=${country}`,
    }).then((res) => {
      console.log(res);
      setData(res.data);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getPostData();
    };
    fetchData();
  }, [country]);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <RankingWrapper>
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
                  <TotalLike>{content.like}</TotalLike>
                </Like>
              </div>
              <StoreName>{content.storeName}</StoreName>
            </Left>
            <img src={content.img} alt={content.storeName}></img>
          </ContentBox>
        );
      })}
    </RankingWrapper>
  );
};

export default Ranking;
