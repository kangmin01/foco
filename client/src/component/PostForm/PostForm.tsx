import {
  Modal,
  ModalBody,
  Title,
  TitleInput,
  Line,
  ImgsBox,
  InfosBox,
  InfoBox,
  InfoName,
  InfoInput,
  CommentBox,
  CommentName,
  CommentText,
  LocationBox,
  LocationName,
  LocationSearch,
  ButtonBox,
  FormButton,
} from './styles';
import { TfiCheck, TfiClose } from 'react-icons/tfi';

import LocationSearchInput from './func/LocationSearchInput';
import StarRating from './func/StarRating';
// import UploadImg from './func/UploadImg';
// import UploadedImg from './func/UploadedImg';
// import AddImg from './func/AddImg';

import './style.css';

import { useState, useEffect } from 'react';

const PostForm = (props: any) => {
  const [title, setTitle] = useState<string>('');
  const [food, setFood] = useState<string>('');
  const [mood, setMood] = useState<string>('');
  const [star, setStar] = useState<number>();
  const [comment, setComment] = useState<string>('');
  // const [city, setCity] = useState<string>('');
  // const [location, setLocation] = useState<string>('');

  useEffect(() => {}, [title, food, mood, star, comment]);

  return (
    <Modal>
      <ModalBody>
        <Title>
          <TitleInput
            onChange={(e) => setTitle(e.target.value)}
            placeholder="restaurant name"
          ></TitleInput>
        </Title>
        <Line />
        <ImgsBox></ImgsBox>
        <InfosBox>
          <InfoBox>
            <InfoName>Food</InfoName>
            <InfoInput
              onChange={(e) => setFood(e.target.value)}
              placeholder="pizza"
            ></InfoInput>
          </InfoBox>
          <InfoBox>
            <InfoName>Mood</InfoName>
            <InfoInput
              onChange={(e) => setMood(e.target.value)}
              placeholder="special"
            ></InfoInput>
          </InfoBox>
          <InfoBox>
            <InfoName>Score</InfoName>
            <StarRating></StarRating>
          </InfoBox>
        </InfosBox>
        <Line />
        <CommentBox>
          <CommentName>Comment</CommentName>
          <CommentText>
            <textarea
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
              rows={8}
              placeholder={'Out of this world!!'}
            />
          </CommentText>
        </CommentBox>
        <Line />
        <LocationBox>
          <LocationName>Location</LocationName>
          <LocationSearch>
            {/* <LocationSearchInput /> */}
            <LocationSearchInput />
          </LocationSearch>
        </LocationBox>
        <ButtonBox>
          <FormButton onClick={props.onSubmit}>
            <TfiCheck />
          </FormButton>
          <FormButton onClick={props.onClose}>
            <TfiClose />
          </FormButton>
        </ButtonBox>
      </ModalBody>
    </Modal>
  );
};

export default PostForm;
