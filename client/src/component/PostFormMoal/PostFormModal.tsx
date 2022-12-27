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
  // const userName = localStorage.getItem('userName');
  // const userCountry = localStorage.getItem('userCountry');
  const userName = 'test-mini';
  const userCountry = 'Japan';

  const [files, setFiles] = useState<string[]>([]);
  const [preview, setPreview] = useState<string[]>([]);

  interface postFormDataType {
    storeName: string;
    review: string;
    grade: number;
    address: string;
    likeUsers: string[];
    lat: number;
    lng: number;
    mood: string[];
    foodType: string[];
    city: string;
    country: string;
  }

  const [postFormData, setPostFormData] = useState<postFormDataType>({
    storeName: '',
    review: '',
    grade: 0,
    address: '',
    likeUsers: [],
    lat: 0,
    lng: 0,
    mood: [],
    foodType: [],
    city: '',
    country: '',
  });

  const handleChange = (e: any): void => {
    setPostFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [strLength, setStrLength] = useState<number | undefined>(0);

  const checkString = (): void => {
    setStrLength(postFormData.review?.length);
    if (strLength !== undefined && strLength > 500) {
      setStrLength(500);
    }
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert('submit');

    if (userCountry !== postFormData.country) {
      alert('You can only write posts that correspond to your country!');
    } else {
      const formData = new FormData();

      if (files?.length === undefined) {
        alert('Please Add Image!');
        return;
      } else {
        for (let i = 0; i < files?.length; i++) {
          formData.append('images', files[i]);
        }
      }

      axios.post('/post/upload', formData).then(async (response) => {
        console.log(response);
        const imgList = [...response.data];
        const postData = {
          ...postFormData,
          img: imgList,
          user: userName,
          country: userCountry,
        };
        return await axios
          .post('/post', postData)
          .then((response) => {
            console.log(response);
            alert('success post!');
            props.setModalOpen(false);
          })
          .catch((error) => console.log('err', error));
      });
    }
  };

  useEffect(() => {}, [files, preview, postFormData]);

  return (
    <Modal>
      <ModalBody>
        <Header>
          <Likes>
            <span>❤️</span>
            <span>{postFormData.likeUsers?.length}</span>
          </Likes>
          <Close onClick={() => props.setModalOpen(false)}>
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
              <LocationSearchInput setPostFormData={setPostFormData} />
            </Address>
            <Rate>
              <StarRating
                name="rate"
                setPostFormData={setPostFormData}
              ></StarRating>
            </Rate>
          </Intro>
          <ImageBox>
            <AddImages setFiles={setFiles} setPreview={setPreview}></AddImages>
          </ImageBox>
          <Tag>
            <CreatableSelectBox
              setPostFormData={setPostFormData}
              name="mood"
              placeholder="Mood"
            />
            <CreatableSelectBox
              setPostFormData={setPostFormData}
              name="foodType"
              placeholder="Food"
            />
          </Tag>
          <Review>
            <textarea
              name="review"
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
            <button type="submit" onClick={handleSubmit}>
              submit
            </button>
            {/* <button>edit</button>
            <button>delete</button> */}
          </Button>
        </Main>
      </ModalBody>
    </Modal>
  );
};

export default PostFormModal;
