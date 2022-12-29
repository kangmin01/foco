import styled from 'styled-components';

export const MapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 140px;
  padding-bottom: 145px;
  background-color: #fff;
  & .map {
    width: 64vw;
    height: 70vh;
  }
`;

export const TopWrapper = styled.div`
  margin: 40px;
`;

export const BottomWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
