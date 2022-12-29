import styled from 'styled-components';

export const ContentsWrapper = styled.span`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 1200px;
  height: 135vh;
  justify-content: flex-start;

  @media screen and (max-width: 1212px) {
    width: 100%;
    height: 200vh;
    justify-content: center;
  }
  @media screen and (max-width: 920px) {
    width: 100%;
    height: 400vh;
  }
`;

export const ContentWrapper = styled.span`
  position: relative;
  display: flex;
  justify-content: center;
  width: 400px;
  max-height: 320px;
  border-radius: 10px;
  cursor: pointer;
  img {
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 10px;
  }
  &:hover div {
    display: flex;
  }
`;
export const HoverContent = styled.div`
  position: absolute;
  display: none;
  width: 300px;
  height: 300px;
  z-index: 1;
`;

export const HoverBottom = styled.div`
  position: absolute;
  top: 210px;
  z-index: 2;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 15px 20px 15px;
`;
export const City = styled.span`
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  & svg {
    margin-right: 5px;
  }
`;

export const Icons = styled.div`
  & svg {
    margin-left: 10px;
    font-size: 20px;
    color: gray;
    cursor: pointer;

    :nth-child(1) {
      &:hover {
        color: #f13b3b;
      }
    }
    :nth-child(2) {
      &:hover {
        color: #ffb800;
      }
    }
  }
`;

export const LikeWrapper = styled.div`
  position: absolute;
  top: 100%;
  right: 50px;
  & svg {
    color: #f13b3b;
  }
`;
export const TotalLike = styled.span`
  color: #000;
  margin-left: 5px;
`;
