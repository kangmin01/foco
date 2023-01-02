import styled from 'styled-components';

export const RankingWrapper = styled.div`
  width: 30vw;
  height: 73vh;
  margin: 0 20px;
  padding: 40px;
  box-sizing: border-box;
  border: 3px solid #eaeaea;
  border-radius: 10px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #ccc;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.span`
  font-size: 40px;
  font-family: 'Rubik Spray Paint', cursive;
`;

export const Button = styled.button`
  border: none;
  font-size: 30px;
  background-color: transparent;
  cursor: pointer;
`;

export const MoreButton = styled(Button)`
  background-color: #d8aaaa;
  border-radius: 10px;
  padding: 5px 10px;
  margin: 15px 0;
  font-size: 18px;
  color: #fff;
  font-weight: 600;
  float: right;
  &:hover {
    box-shadow: rgba(0, 0, 0, 40%) 0px 2px 4px 0px inset;
  }
`;

export const ContentBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 25px 0;
  padding: 30px 28px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  border-radius: 10px;
  cursor: pointer;
  & img {
    position: relative;
    width: 60%;
    border-radius: 10px;
    margin-right: 15px;
  }

  & .openButton {
    position: absolute;
    right: 20px;
    top: 20px;
  }
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StoreName = styled.span`
  font-weight: 600;
`;

export const Number = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

export const Like = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  & svg {
    color: red;
    margin-right: 5px;
  }
`;

export const TotalLike = styled.span`
  color: #939393;
`;
