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
import CreatableSelectBox from '../CreatableSelectBox/CreatableSelecBox';
import axios from 'axios';

const PostFormModal = (props: any) => {
  const [grade, setGrade] = useState<number>(0);
  const [address, setAddress] = useState<string | undefined>('');
  const [city, setCity] = useState<string | Blob>('');
  const [mood, setMood] = useState<string[]>([]);
  const [foodType, setFoodType] = useState<string[]>([]);

  const [likeUsers, setLikeUsers] = useState<string[] | undefined>([]);
  const [lat, setLat] = useState<number | undefined>();
  const [lng, setLng] = useState<number | undefined>();

  const [strLength, setStrLength] = useState<number | undefined>(0);

  const [files, setFiles] = useState<string[]>(); // 변환 전
  const [preview, setPreview] = useState<string[] | undefined>();

  interface postFormDataType {
    storeName: string;
    review: string;
  }

  const [postFormData, setPostFormData] = useState<postFormDataType>({
    storeName: '',
    review: '',
  });

  // | React.ChangeEvent<HTMLInputElement>
  // | React.ChangeEvent<HTMLTextAreaElement>
  const handleChange = (e: any): void => {
    setPostFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setStoreName(e.target.value);
  // };

  // const handleReviewChange = (
  //   e: React.ChangeEvent<HTMLTextAreaElement>
  // ): void => {
  //   SetReview(e.target.value);
  // };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert('submit');

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
      console.log(res);
      const imgList = [...res.data];
      // const postData = {
      //   user,
      //   country,
      //   storeName,
      //   review,
      //   grade,
      //   address,
      //   city,
      //   img: preview,
      //   likeUsers,
      //   mood,
      //   foodType,
      //   lat,
      //   lng,
      // };

      // return await axios
      //   .post('/post', postData)
      //   .then((response) => console.log('res is', response))
      //   .catch((error) => console.log('err', error));
    });
    setSubmitForm(false);
    props.onClose();
  };

  const checkString = (): void => {
    setStrLength(postFormData.review?.length);
    if (strLength !== undefined && strLength > 500) {
      setStrLength(500);
    }
  };

  useEffect(() => {
    console.log(postFormData);
  }, [postFormData]);

  const [submitForm, setSubmitForm] = useState<boolean>(true);

  return (
    <Modal>
      <ModalBody>
        <Header>
          <Likes>
            <span>❤️</span>
            <span>{likeUsers?.length}</span>
          </Likes>
          <Close onClick={props.onClose}>
            <IoIosClose />
          </Close>
        </Header>
        <Main>
          <Intro>
            <Title>
              <input
                name="storeName"
                onChange={handleChange}
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
          <Tag>
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
              onChange={handleChange}
              maxLength={500}
              rows={5}
              placeholder={
                'I’m pleasure to recommend this restaurant to you:) It’s very delicious! What a Nice Day!'
              }
            />
            <span>( {strLength} / 500 )</span>
          </Review>
          <Button>
            {submitForm === true ? (
              <button type="submit" onClick={handleSubmit}>
                submit
              </button>
            ) : (
              <>
                <button>edit</button>
                <button>delete</button>
              </>
            )}
            {/* <button type="submit" onClick={handleSubmit}>
              submit
            </button>
            <button>edit</button>
            <button>delete</button> */}
          </Button>
        </Main>
      </ModalBody>
    </Modal>
  );
};

export default PostFormModal;
