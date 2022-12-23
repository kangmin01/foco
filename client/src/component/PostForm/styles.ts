import styled from 'styled-components';

export const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalBody = styled.form`
  width: 960px;
  height: 1200px;
  background: no-repeat
    url('https://cdn.discordapp.com/attachments/1025667513629016165/1052643859542315018/image.png');
  background-size: contain;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

export const TitleInput = styled.input`
  width: 500px;
  height: 60px;
  font-size: 40px;
  padding: 5px;
`;

export const Line = styled.hr`
  width: 60%;
  border: 0;
  border-top: 3px dotted black;
`;

export const ImgsBox = styled.div`
  display: flex;
  border: 1px solid black;
  padding: 10px;
  width: 90%;
  height: 260px;
`;

export const AddImg = styled.div`
  width: 100%;
  height: 150px;
`;

export const InfosBox = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoName = styled.span`
  font-size: 25px;
  text-align: center;
  margin-bottom: 15px;
`;

export const InfoInput = styled.input`
  font-size: 16px;
  padding: 5px;
`;

export const CommentBox = styled.div`
  width: 60%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin-left: 192px;
`;

export const CommentText = styled.div`
  background-color: teal;
  width: 550px;
  display: flex;
  justify-content: center;
  align-items: center;

  & textarea {
    width: 100%;
    padding: 7px;
  }
`;

export const CommentName = styled.span`
  font-size: 25px;
  text-align: center;
  margin-bottom: 15px;
`;

export const CommentInput = styled.textarea`
  padding: 8px;
  font-size: 16px;
`;

export const LocationBox = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

export const LocationName = styled.span`
  font-size: 25px;
  margin-bottom: 15px;
`;

export const LocationSearch = styled.div`
  display: flex;
  height: 40px;
`;

export const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const FormButton = styled.button`
  border: none;
  font-size: 36px;
  background-color: #f0e9d2;
  padding: 8px 80px;
  border-radius: 30px;

  &:nth-of-type(1) {
    margin-right: 100px;
  }

  &:hover {
    background-color: #e6ddc4;
    cursor: pointer;
  }
`;
