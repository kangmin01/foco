import styled from 'styled-components';

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
  font-size: 40px;
  font-weight: bold;
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

  & img {
    width: 300px;
  }

  & .review {
    width: 300px;
    height: 300px;
    margin: 30px;

    &:hover {
      cursor: pointer;
      filter: brightness(0.6);
    }

    & div {
      text-align: center;
      margin-top: 10px;
    }
  }
`;
