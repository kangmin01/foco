import styled from 'styled-components';

// 모달창 배경
export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;
// 모달
export const ModalWrapper = styled.div`
  width: 50vw;
  height: 70vh;
  padding: 20px;
  border-radius: 20px;
  background-color: #fff;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: #ccc;
  }
`;
// 상단 타이틀
export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 20vh;
`;
// 상단(좋아요~닫기)
export const IconsWrapper = styled.div`
  display: flex;
  font-size: 1.5vh;
  justify-content: space-between;
`;

export const Icons = styled.div`
  .heart {
    color: pink;
    cursor: pointer;
    &:hover {
      color: red;
      scale: 1.5;
    }
    &:active {
      color: red;
      scale: 1.5;
    }
  }
  .spoon {
    color: lightgray;
    cursor: pointer;
    margin-left: 15px;
    &:hover {
      color: gold;
      scale: 1.5;
    }
  }
`;
export const CloseIcon = styled.div`
  cursor: pointer;
  &:hover {
    scale: 1.5;
  }
`;
// 상단(가게 이름 + 주소 + 평점)
export const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0 30px;
  margin-top: 2vh;
  align-items: center;
  justify-content: space-between;
`;

export const StoreInfo = styled.div`
  display: flex;
`;

export const TitleBlock = styled.div`
  font-size: 9rem;
  font-weight: 1;
  margin-right: 1rem;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Rubik Spray Paint', cursive;
`;
export const StoreName = styled.div`
  font-weight: 400;
  font-size: 5vh;
`;
export const Info = styled.div`
  font-size: 1.8vh;
  margin-top: 0.5vh;
  color: #868686;
`;

export const Profile = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 100%;
`;
// 본문 내용()
export const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

// 본문- 아이템 이미지 여러개
export const ImgBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  //   padding: 10px;
  margin: 1rem;
  padding: 0.5rem;
  height: 25vh;
  display: flex;
  flex-direction: row;
  width: 100%;
  & img {
    border-radius: 10px;
    margin-right: 10px;
  }
`;
// 본문- 아이템 이미지
export const Item = styled.img`
  width: 15vw;
  height: 20vh;
  flex-direction: row;
  border-radius: 10%;
  + img {
    margin-left: 1rem;
  }
`;
// 본문- 하단
export const Content = styled.div`
  height: 10vh;
  padding-left: 4rem;
`;
export const TagBox = styled.div`
  text-align: center;
  color: #737373;
  font-weight: 400;
  font-size: 1.3vh;
  width: 90%;
`;

// 본문 - 하단- 텍스트
export const TextBox = styled.div`
  margin-top: 3.5rem;
  font-size: 1.5vh;
  width: 90%;
`;
