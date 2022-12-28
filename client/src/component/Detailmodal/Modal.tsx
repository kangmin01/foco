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
  ItemB,
} from './style';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaUtensilSpoon } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

interface Iprops {
  postNum: number;
  closeModal: () => void;
  like: number;
  setLike: any;
}

const Modal = (props: Iprops) => {
  const [data, setData] = useState<any>();
  const [heart, setHeart] = useState<string>('');
  const [spoon, setSpoon] = useState<string>('');
  const userNum = localStorage.getItem('userNum');

  // 데이터 불러오기
  const getData = () => {
    return axios({
      method: 'get',
      url: `/post/${props.postNum}`,
    }).then((res) => {
      setData(res.data);

      // 좋아요 유저 확인
      checkLikeUser(res);
      checkBookMarkUser();
    });
  };

  const checkLikeUser = (res: any) => {
    for (const x of res.data.likeUsers) {
      if (x == userNum) {
        setHeart('red');
        return;
      }
    }
    setHeart('pink');
  };

  const checkBookMarkUser = () => {
    return axios({
      method: 'get',
      url: `/bookmark/${userNum}`,
    }).then((res) => {
      for (const x of res.data) {
        if (x.postNum == props.postNum) {
          setSpoon('gold');
          return;
        }
      }
      setSpoon('lightgray');
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, []);

  // 좋아요 업데이트시, page reload
  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, [props.like]);

  const increaseHeart = () => {
    return axios({
      method: 'post',
      url: `/post/like/${userNum}/${props.postNum}`,
    }).then((res) => {
      props.setLike(res.data.likeCount);
    });
  };

  const decreaseHeart = () => {
    return axios({
      method: 'delete',
      url: `/post/like/${userNum}/${props.postNum}`,
    }).then((res) => {
      props.setLike(res.data.likeCount);
    });
  };

  const clickHeart = () => {
    if (heart === 'pink') {
      setHeart('red');
      increaseHeart();
    } else {
      setHeart('pink');
      decreaseHeart();
    }
  };

  const addBookmark = () => {
    return axios({
      method: 'post',
      url: `/bookmark`,
      data: {
        userNum,
        postNum: props.postNum,
      },
    }).then((res) => {
      console.log(res);
    });
  };

  const deleteBookmark = () => {
    return axios({
      method: 'delete',
      url: `/bookmark`,
      data: {
        userNum,
        postNum: props.postNum,
      },
    }).then((res) => {
      console.log(res);
    });
  };

  const clickSpoon = () => {
    if (spoon === 'lightgray') {
      setSpoon('gold');
      addBookmark();
    } else {
      setSpoon('lightgray');
      deleteBookmark();
    }
  };

  // 모달 창 떴을 시 배경 스크롤 막기
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);
  type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

  const onWheel = (
    apiObj: scrollVisibilityApiType,
    ev: React.WheelEvent
  ): void => {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

    if (isThouchpad) {
      ev.stopPropagation();
      return;
    }

    if (ev.deltaY < 0) {
      apiObj.scrollNext();
    } else if (ev.deltaY > 0) {
      apiObj.scrollPrev();
    }
  };

  // 서버에서 불러오는 시간 차이 에러를 해결하기 위해
  if (spoon === '' || heart === '') {
    return <></>;
  }
  return (
    <ModalBackground>
      <ModalWrapper>
        <TitleWrapper>
          <IconsWrapper>
            <Icons>
              <AiFillHeart
                className="heart"
                color={heart}
                onClick={clickHeart}
              />
              <div className="likeCount">{data?.likeUsers.length}</div>
              <FaUtensilSpoon
                className="spoon"
                color={spoon}
                onClick={clickSpoon}
              />
            </Icons>
            <CloseIcon>
              <IoClose onClick={props.closeModal} />
            </CloseIcon>
          </IconsWrapper>
          <TitleBox>
            <StoreInfo>
              <TitleBlock>|</TitleBlock>
              <Title>
                <StoreName>{data?.storeName}</StoreName>
                <Info>{data?.address}</Info>
                <Info>{data?.grade}</Info>
              </Title>
              <Profile src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
            </StoreInfo>
          </TitleBox>
        </TitleWrapper>
        <Box>
          <ImgBox>
            <ScrollMenu onWheel={onWheel}>
              {data?.img.map((img: string) => {
                return <ItemB src={img} alt={data.storeName} />;
              })}
            </ScrollMenu>
          </ImgBox>
          <Content>
            <TagBox>
              {data?.mood.map((mood: string) => {
                return <span>#{mood} </span>;
              })}
              {data?.foodType.map((foodType: string) => {
                return <span>#{foodType} </span>;
              })}
            </TagBox>
            <TextBox>{data?.review}</TextBox>
          </Content>
        </Box>
      </ModalWrapper>
    </ModalBackground>
  );
};

export default Modal;
