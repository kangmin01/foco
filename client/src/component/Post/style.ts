import styled from 'styled-components';
import '../../GlobalStyle';

export const ReviewPage = styled.div`
  display: flex;
  justify-content: center;
`;

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  align-items: center;
`;

export const Title = styled.div`
  padding-top: 150px;
  font-size: 50px;
  font-weight: 100;
  font-family: 'Rubik Spray Paint', cursive;
`;

export const ReviewManagement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const ReviewButton = styled.button`
  width: 140px;
  font-size: 20px;
  padding: 12px;
  border-radius: 30px;
  border: 1px solid gray;
  margin: 80px 0;
  margin-right: 90px;
  align-self: flex-end;

  &:hover {
    background-color: white;
    cursor: pointer;
  }
`;

export const ReviewList = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 25px;
  width: 100%;
  padding: 0 60px;
`;

export const ReviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
  // justufy-content: center;
`;

export const ReviewImageBox = styled.div`
  width: 300px;
  height: 300px;
  margin-bottom: 15px;

  &:hover .imageHover {
    z-index: 100;
  }
`;

export const ImageHover = styled.div`
  // z-index: 10;
  width: 300px;
  height: 300px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  // width: auto;
  // height: auto;
  // max-width: 300px;
  // max-height: 300px;
`;

export const ManagementBox = styled.div`
  display: flex;

  & button {
    display: flex;
    font-size: 50px;
    border: 3px solid white;
    border-radius: 50%;
    padding: 10px;
    color: white;
    background-color: transparent;

    &:hover {
      cursor: pointer;
      color: #bdbdbd;
      border-color: #bdbdbd;
    }

    &:first-child {
      margin-right: 30px;
    }
  }
`;

export const Likes = styled.div`
  color: white;
  align-self: start;
  position: absolute;
  bottom: 14px;
  left: 12px;
`;
