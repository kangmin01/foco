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
import CreatableSelectBox from '../CreateableSelectBox/CreatableSelecBox';
import axios from 'axios';

const PostFormModal = (props: any) => {
  // interface formDataType
  const [storeName, setStoreName] = useState<string | undefined>('');
  const [review, SetReview] = useState<string | undefined>('');
  const [grade, setGrade] = useState<number | undefined>();
  const [address, setAddress] = useState<string | undefined>('');
  const [city, setCity] = useState<string | Blob>('');
  const [mood, setMood] = useState<string[]>([]);
  const [foodType, setFoodType] = useState<string[]>([]);
  const [files, setFiles] = useState<string[]>(); // 변환 전
  const [preview, setPreview] = useState<string[] | undefined>();
  const [like, setLike] = useState<number | undefined>(0);
  const [lat, setLat] = useState<number | undefined>();
  const [lng, setLng] = useState<number | undefined>();

  const [strLength, setStrLength] = useState<number | undefined>(0);

  const userName: string = 'mini';
  const country: string = 'Korea';

  // interface FormDataType {
  //   user: string | undefined;
  //   storeName: string | undefined;
  //   grade: number | undefined;
  //   img: string[] | undefined;
  //   review: string | undefined;
  //   city: string | undefined;
  //   country: string | undefined;
  //   address: string | undefined;
  //   like: string | undefined;
  //   lat: number | undefined;
  //   lng: number | undefined;
  //   mood: string | undefined;
  //   foodType: string | undefined;
  // }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setStoreName(e.target.value);
  };

  const handleReviewChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    SetReview(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (files?.length === undefined) {
      alert('이미지를 추가해라');
      return;
    } else {
      for (let i = 0; i < files?.length; i++) {
        formData.append('images', files[i]);
      }
    }

    axios.post('/post/upload', formData).then(async (res) => {
      const imgList = [...res.data];
      const postData = {
        user: userName,
        country,
        storeName,
        review,
        grade,
        address,
        city,
        img: imgList,
        like,
        mood,
        foodType,
        lat,
        lng,
      };

      return await axios
        .post('/post', postData)
        .then((response) => console.log('제발 res는!!!!', response))
        .catch((error) => console.log('err', error));
    });
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
    grade,
    address,
    city,
    files,
    strLength,
    mood,
    foodType,
  ]);

  return (
    <Modal>
      <ModalBody>
        <Header>
          <Likes>
            <span>❤️</span>
            <span>{like}</span>
          </Likes>
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
                placeholder="write store name..."
              ></input>
            </Title>
            <Address>
              <Input
                placeholder="city"
                onChange={(e): void => setCity(e.target.value)}
              ></Input>
              <LocationSearchInput
                setLat={setLat}
                setLng={setLng}
                setAddress={setAddress}
              />
            </Address>
            <Rate>
              <StarRating name="rate" setGrade={setGrade}></StarRating>
            </Rate>
          </Intro>
          <ImageBox>
            <AddImages setPreview={setPreview} setFiles={setFiles}></AddImages>
          </ImageBox>
          <Tag className="sival">
            <CreatableSelectBox
              setState={setMood}
              type="mood"
              placeholder="Mood"
            />
            <CreatableSelectBox
              setState={setFoodType}
              type="food"
              placeholder="Food"
            />
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
