import { useState, useEffect } from 'react';

import {
  Modal,
  ModalBody,
  Header,
  Likes,
  Close,
  Main,
  Intro,
  ImageBox,
  Tag,
  Review,
  Button,
  Title,
  Address,
  Rate,
  Input,
} from './style';
import StarRating from './func/StarRating';
import { IoIosClose } from 'react-icons/io';

import AddImages from './func/AddImages';
import LocationSearchInput from './func/LocationSearchInput';
import axios from 'axios';

const PostFormModal = (props: any) => {
  // interface formDataType
  const [storeName, setStoreName] = useState<string | undefined>('');
  const [review, SetReview] = useState<string | undefined>('');
  const [stars, setStars] = useState<number | undefined>();
  const [address, setAddress] = useState<string | undefined>();
  const [imageList, setImageList] = useState<string[] | undefined>();

  const [strLength, setStrLength] = useState<number | undefined>(0);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setStoreName(e.target.value);
  };

  const handleReviewChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    SetReview(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    alert('submit??');
    let body = {
      storeName,
      review,
      stars,
      address,
      imageList,
    };
    console.log(body);
    // axios.post('/', body).then((res) => console.log(res));
  };

  const checkString = (): void => {
    setStrLength(review?.length);
    if (strLength !== undefined && strLength > 500) {
      setStrLength(500);
    }
  };

  useEffect(() => {}, [
    storeName,
    review,
    stars,
    address,
    imageList,
    strLength,
  ]);

  return (
    <Modal>
      <ModalBody>
        <Header>
          <Likes>컴포넌트 삽입</Likes>
          <Close onClick={props.onClose}>
            <IoIosClose />
          </Close>
        </Header>
        <Main>
          <Intro>
            <Title>
              <input
                onChange={handleTitleChange}
                className="store"
                placeholder="wirte store name..."
              ></input>
            </Title>
            <Address>
              <Input placeholder="city"></Input>
              <LocationSearchInput setAddress={setAddress} />
            </Address>
            <Rate>
              <StarRating name="rate" setStars={setStars}></StarRating>
            </Rate>
          </Intro>
          <ImageBox>
            <AddImages setImageList={setImageList}></AddImages>
          </ImageBox>
          <Tag>
            <input name="mood" type="text" placeholder="#special" />
            <input name="food" type="text" placeholder="#pasta" />
          </Tag>
          <Review>
            <textarea
              onKeyUp={checkString}
              onChange={handleReviewChange}
              maxLength={500}
              rows={5}
              placeholder={
                'I’m pleasure to recommend this restaurant to you:) It’s very delicious! What a Nice Day!'
              }
            />
            <span>( {strLength} / 500 )</span>
          </Review>
          <Button>
            <button type="submit" onClick={handleSubmit}>
              submit
            </button>
          </Button>
        </Main>
      </ModalBody>
    </Modal>
  );
};

export default PostFormModal;
