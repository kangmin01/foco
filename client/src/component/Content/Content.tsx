import React, { useState, useEffect } from 'react';
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
  title: string;
  country: string;
  citySelect: string | undefined;
  moodSelect: string | undefined;
  foodTypeSelect: string | undefined;
}

const Content = (props: Iprops) => {
  const [contents, setContents] = useState<Icontent[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [postNum, setPostNum] = useState<number>(0);
  const [like, setLike] = useState<number>(0);
  const userNum = localStorage.getItem('userNum');

  let postSelect = '';

  if (props.citySelect || props.moodSelect || props.foodTypeSelect) {
    postSelect += props.citySelect;
    postSelect += props.moodSelect;
    postSelect += props.foodTypeSelect;
  }

  let url = String(postSelect)
    .replace('undefined', '')
    .replace('undefined', '');
  console.log(url);

  const getSelectContent = () => {
    return axios({
      method: 'get',
      // url: `/post?country=${props.country}${url}`,
      url:
        props.title != 'My BookMark'
          ? `/post?country=${props.country}${url}`
          : `/bookmark/${userNum}/post?country=${props.country}${url}`,
    }).then((res) => {
      setContents(res.data);
    });
  };

  useEffect(() => {
    const fetchContents = async () => {
      await getSelectContent();
    };
    fetchContents();
  }, [postSelect]);

  const getPostContents = () => {
    return axios({
      method: 'get',
      url: `/post?country=${props.country}`,
    }).then((res) => {
      setContents(res.data);
    });
  };

  const getMyBookmark = () => {
    return axios({
      method: 'get',
      url: `/bookmark/${userNum}`,
    }).then((res) => {
      setContents(res.data);
    });
  };

  useEffect(() => {
    const fetchContents = async () => {
      // 만약 bookMark 페이지에서 불러오는 거라면 bookMark를 load
      props.title != 'My BookMark'
        ? await getPostContents()
        : await getMyBookmark();
    };
    fetchContents();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      props.title != 'My BookMark'
        ? await getPostContents()
        : await getMyBookmark();
    };
    fetchData();
  }, [like]);

  const openModal = (postNum: number) => {
    setModalOpen(true);
    setPostNum(postNum);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <ContentsWrapper>
      {modalOpen && (
        <Modal
          postNum={postNum}
          closeModal={closeModal}
          like={like}
          setLike={setLike}
        />
      )}
      {contents.map((content: Icontent, index: number) => {
        return (
          <ContentWrapper key={content.postNum}>
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
              <TotalLike>{content.likeUsers.length}</TotalLike>
            </LikeWrapper>
          </ContentWrapper>
        );
      })}
    </ContentsWrapper>
  );
};

export default Content;
