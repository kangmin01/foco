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

const PostFormModal = (props: any) => {
  const [files, setFiles] = useState<string[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [content, setContent] = useState<any>();
  const userName = localStorage.getItem('userName');
  const userCountry = localStorage.getItem('userCountry');
  const userNum = localStorage.getItem('userNum');

  // 기존의 글을 클릭한 모달이라면 postNum으로 해당 게시글의 글 가져와서 value에 뿌려주기

  useEffect(() => {
    const getContents = () => {
      return axios({
        method: 'get',
        url: `/post/${props.postNum}`,
      }).then((res) => {
        setContent(res.data);
      });
    };
    getContents();
  }, []);

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
    console.log(postFormData.country);

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
        const imgList = [...response.data];
        const postData = {
          ...postFormData,
          img: imgList,
          name: userName,
          country: userCountry,
        };

        // 새로운 글을 작성한다면 post 요청
        if (props.postNum == 0) {
          await axios
            .post('/post', postData)
            .then(async (response) => {
              console.log(response);
              alert('success post!');
              await axios
                .post(`/user/${response.data.post._id}/${userNum}`)
                .then((response) => console.log(response))
                .catch((error) => console.log(error));

              props.setModalOpen(false);
            })
            .catch((error) => console.log(error));
        } else {
          // 기존 글이라면 patch 요청
          await axios
            .patch(`/post/${props.postNum}`, postData)
            .then(async (response) => {
              console.log(response);
              alert('success patch!');
              props.setModalOpen(false);
            })
            .catch((error) => console.log(error));
        }
      });
    }
  };

  useEffect(() => {
    // console.log(postFormData);
  }, [userName, userCountry, userNum, files, preview, strLength, postFormData]);

  return (
    <Modal>
      <ModalBody>
        <Header>
          <Likes>
            {/* <span>❤️</span>
            <span>{postFormData.likeUsers?.length}</span> */}
          </Likes>
          <Close
            onClick={() => {
              props.setModalOpen(false);
              props.setPostNum(null);
            }}
          >
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
                defaultValue={props.postNum != 0 ? content?.storeName : ''}
                placeholder="write store name..."
              ></input>
            </Title>
            <Address>
              <LocationSearchInput
                setPostFormData={setPostFormData}
                address={content?.address}
              />
            </Address>
            <Rate>
              <StarRating
                name="rate"
                setPostFormData={setPostFormData}
                grade={content?.grade}
              ></StarRating>
            </Rate>
          </Intro>
          <ImageBox>
            <AddImages setFiles={setFiles} setPreview={setPreview}></AddImages>
            {/* TODO : 이미지 css 적용해서 넣어야함 */}
            {/* {content?.img.map((img: string) => {
              return <img src={img} alt={content?.storeName} />;
            })} */}
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
              defaultValue={props.postNum != 0 ? content?.review : ''}
              placeholder="I’m pleasure to recommend this restaurant to you:) It’s very delicious! What a Nice Day!"
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
