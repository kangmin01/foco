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
  ButtonBox,
} from './style';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaUtensilSpoon } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { ROUTE } from '../../Route';
import { Rating } from 'react-simple-star-rating';
import PostFormModal from '../PostFormMoal/PostFormModal';

interface Iprops {
  [x: string]: any;
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
  const [user, setUser] = useState<any>();
  const [modalOpen, setModalOpen] = useState<boolean>(false); // post form

  // 콘텐트 데이터 불러오기
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

  // 좋아요 업데이트시, page reload
  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, [props.like]);

  // 유저데이터 불러오기
  const getUser = async () => {
    const res = await axios.get(`/user/${userNum}`);
    setUser(res.data.user.img);
  };

  useEffect(() => {
    getUser();
  }, []);

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

  const handleEdit = (postNum: number): void => {
    setModalOpen(true);
    // setPostNum(props.postNum);
  };

  const handleDelete = (postNum: number) => {
    alert('Are you sure you want to delete?');
    axios.delete(`/post/${postNum}`).then((res) => {
      console.log(res);
      props.closeModal();
    });
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

  // 스크롤
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
      {modalOpen && (
        <PostFormModal
          setModalOpen={setModalOpen}
          // setPostNum={setPostNum}
          postNum={props.postNum}
        />
      )}
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
                <Info>
                  <Rating
                    size={25}
                    readonly={true}
                    initialValue={data?.grade}
                  />
                  ({data?.grade})
                </Info>
              </Title>
              <Profile src={user} />
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
