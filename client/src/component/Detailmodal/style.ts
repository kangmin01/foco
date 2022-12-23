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
  border-radius: 30px;
  background-color: #fff;
  overflow: auto;
`;
// 상단 타이틀
export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  // margin: 1vh 30px;
  height: 20vh;
  //   width: 72.5vw;
  padding: 2vh;
`;
// 상단(좋아요~닫기)
export const IconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.5vh;
  justify-content: space-between;
`;
export const Icons = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Icon = styled.div`
  + div {
    margin-left: 10px;
  }
  .heart {
    color: pink;
    cursor: pointer;
    &:hover {
      color: red;
      scale: 1.5;
    }
  }
  .heart.active {
    color: red;
    scale: 1.5;
  }
  .spoon {
    color: lightgray;
    cursor: pointer;
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
  margin-top: 2vh;
  margin-left: 2vw;
  align-items: center;
  justify-content: space-around;
`;
export const TitleBlock = styled.div`
  font-size: 9rem;
  font-weight: 1;
  margin-right: 1rem;
`;
export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
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
export const Address = styled.div`
  font-size: 1.8vh;
  margin-top: 0.5vh;
  color: #868686;
`;
export const Score = styled.div`
  font-size: 1.8vh;
  margin-top: 0.5vh;
  color: #868686;
`;
export const Profile = styled.img`
  width: 2.5vw;
  height: 2.5vw;
  border-radius: 100%;
  margin-right: 10%;
`;
// 본문 내용()
export const Box = styled.div`
  display: flex;
  flex-direction: column;
`;
// 본문- 이미지 왔다갔다
export const ImgPage = styled.div`
  height: 25vh;
  display: flex;
  flex-direction: row;
  width: 100%;
`;
export const ImgArrow = styled.div`
  margin-top: 11vh;
  font-size: 3vh;
  color: B1B1B1;
`;
// 본문- 아이템 이미지 여러개
export const ItemBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  //   padding: 10px;
  margin: 1rem;
  padding: 0.5rem;
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
