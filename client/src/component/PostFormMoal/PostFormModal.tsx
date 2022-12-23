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
  const [grade, setGrade] = useState<number | undefined>();
  const [address, setAddress] = useState<string | undefined>('');
  const [city, setCity] = useState<string | Blob>('');
  const [mood, setMood] = useState<string[] | string | undefined>([]);
  const [foodType, setFoodType] = useState<string[] | undefined>([]);
  const [imageList, setImageList] = useState<any>(); // 변환 전
  // const [img, setImg] = useState<string[] | undefined>(); // 변환 후
  const [preview, setPreview] = useState<string[] | undefined>();
  const [like, setLike] = useState<number | undefined>(0);
  const [lat, setLat] = useState<number | undefined>();
  const [lng, setLng] = useState<number | undefined>();

  const [strLength, setStrLength] = useState<number | undefined>(0);

  const user: string = 'mini';
  const country: string = 'Korea';
  const price: number = 24000;

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

  const handleMood = (e: any): void => {
    setMood(e.target.value.split(' '));
  };

  const handleFood = (e: any): void => {
    setFoodType(e.target.value.split(' '));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setLike(1);

    const body: any = {
      user,
      country,
      storeName,
      review,
      grade,
      address,
      city,
      img: preview,
      like,
      mood,
      foodType,
      lat,
      lng,
      price,
    };
    console.log(body);

    // const formData = new FormData();
    // formData.append('file', JSON.stringify(preview));

    // axios.post('/post/upload', formData).then((res) => console.log(res));
    axios
      .post('/post', body)
      .then((response) => console.log('res', response))
      .catch((error) => console.log('err', error));
  };

  const checkString = (): void => {
    setStrLength(review?.length);
    if (strLength !== undefined && strLength > 500) {
      setStrLength(500);
    }
  };

  useEffect(() => {
    // console.log(imageList);
  }, [storeName, review, grade, address, city, imageList, strLength]);

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
            <AddImages
              setPreview={setPreview}
              setImageList={setImageList}
            ></AddImages>
          </ImageBox>
          <Tag>
            <input
              onChange={handleMood}
              name="mood"
              type="text"
              placeholder="#special"
            />
            <input
              onChange={handleFood}
              name="food"
              type="text"
              placeholder="#pasta"
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
