import styled from 'styled-components';

//Common Style
export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AccountContainer = styled.div`
  padding: 100px 50px 0 50px;
  width: 100vw;
`;

export const ContentsBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 40px 0;
  height: 700px;
`;

export const Title = styled.h2`
  margin: 10px 0 60px 0;
  text-align: center;
  font-family: 'Rubik Spray Paint', cursive;
  font-size: 50px;
  font-weight: 100;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 200px;
  height: 100%;
`;

export const InfoItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 26px;
`;

export const Label = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;

  & > p {
    margin: 14px 30px 0 0;
    width: 150px;
    font-weight: 600;
    font-size: 18px;
  }
`;

export const InputBox = styled.div`
  text-align: left;
`;

export const Input = styled.input`
  padding: 4px 8px;
  width: 300px;
  height: 30px;
  border-radius: 6px;
  border: 1px solid #cccccc;

  &:focus {
    outline: 2px solid #2684ff;
  }
  &::placeholder {
    color: #828282;
    font-size: 14px;
  }
`;

export const Errormsg = styled.div`
  height: 20px;
  margin-top: 10px;

  & > p {
    font-size: 13px;
    font-weight: 600;
    color: #f05757;
  }
`;

export const FixedValue = styled.div`
  margin: 10px 0 10px 0;
  padding: 4px 8px;
  width: 360px;
  height: 35px;
  font-weight: 600;
  font-size: 18px;
  text-align: left;
`;

export const Button = styled.button`
  all: unset;
  width: 200px;
  height: 50px;
  border-radius: 30px;
  text-align: center;
  font-weight: bold;
  color: #ffffff;
  background-color: var(--primary-color);
  cursor: pointer;

  &:hover {
    background-color: var(--secondary-color);
    color: #000000;
  }
`;

//Menu Style
export const MenuContainer = styled.div`
  padding: 60px 0 60px 60px;
  width: 300px;
  height: 100%;
  border-right: 2px solid #f3f3f3;
`;

export const UserBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 40px 30px 0;
`;

export const ImgBox = styled.div`
  margin-bottom: 10px;
  border-radius: 100px;
  overflow: hidden;
`;

export const Img = styled.img`
  display: block;
  witdh: 70px;
  height: 70px;
`;

export const Username = styled.div`
  margin-top: 10px;
  font-family: 'Rubik Spray Paint', cursive;
  font-size: 24px;
  font-weight: 100;
`;

export const ItemBox = styled(Box)`
  flex-direction: column;
`;

export const Item = styled(Box)`
  justify-content: flex-start;
  margin: 18px 0;
  padding: 6px 0 6px 10px;
  width: 100%;
  // border-right: 2px solid var(--primary-color);
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: var(--primary-color);
  }
`;

export const Icon = styled.div`
  margin-right: 10px;
  & > svg {
    font-size: 24px;
  }
`;

export const MenuBtn = styled.button`
  all: unset;
  & > * {
    all: unset;
  }
`;

//Profile Style
export const ProfileBox = styled(Box)`
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 40px;
`;

export const PhotoBox = styled(UserBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 0;
`;

export const PhotoInner = styled(ImgBox)`
  margin: 0;
  border-radius: 100px;
  overflow: hidden;
`;

export const Photo = styled(Img)`
  display: block;
  witdh: 100px;
  height: 100px;
`;

export const UploadInput = styled.input`
  display: none;
`;

export const UploadBtn = styled.label`
  position: absolute;
  right: -10px;
  bottom: -10px;
  width: 40px;
  height: 40px;
  border-radius: 100px;
  border: 4px solid white;
  background-color: var(--primary-color);
  cursor: pointer;

  & > svg {
    position: absolute;
    top: 6px;
    right: 8px;
    padding-top: 1px;
    font-size: 16px;
    color: white;
  }
`;

export const CountrySelect = styled.div`
  width: 320px;
  text-align: left;
  font: 18px;
`;

//Security Style
export const SecurityBox = styled(Box)`
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
`;

//Deactivate
export const DeactivateBox = styled(Box)`
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 40px;
`;
