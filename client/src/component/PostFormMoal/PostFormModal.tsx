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
} from './style';
import StarRating from './func/StarRating';
import { IoIosClose } from 'react-icons/io';
import AddImages from './func/AddImages';
import LocationSearchInput from './func/LocationSearchInput';
import CreatableSelectBox from '../CreatableSelectBox/CreatableSelecBox';
import axios from 'axios';

interface postFormDataType {
  storeName: string | undefined;
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
  img: string[];
}

const PostFormModal = (props: any) => {
  const [files, setFiles] = useState<string[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  // const [img, setImg] = useState<string[]>([]);
  const [content, setContent] = useState<postFormDataType>();
  const userName = localStorage.getItem('userName');
  const userCountry = localStorage.getItem('userCountry');
  const userNum = localStorage.getItem('userNum');

  // 기존의 글을 클릭한 모달이라면 postNum으로 해당 게시글의 글 가져와서 value에 뿌려주기

  const [postFormData, setPostFormData] = useState<postFormDataType>({
    storeName: content?.storeName,
    // storeName: '',
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
    img: [],
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
  console.log('df', files);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!postFormData.storeName || content?.storeName) {
      alert('Write store name!');
      return;
    } else if (!postFormData.address) {
      alert('Write address!');
      return;
    } else if (userCountry !== postFormData.country) {
      alert('You can only write posts that correspond to your country!');
      return;
    } else if (!postFormData.grade) {
      alert("You can't give 0 points!");
      return;
    } else if (!files.length) {
      console.log('bb', files.length);
      alert('Please Add Image!');
      return;
    } else if (!postFormData.mood.length) {
      alert('Write mood!');
      return;
    } else if (!postFormData.foodType.length) {
      alert('Write food!');
      return;
    } else if (!postFormData.review) {
      alert('Write review!');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files?.length; i++) {
      formData.append('images', files[i]);
    }
    console.log('files', files);

    axios.post('/api/post/upload', formData).then(async (response) => {
      const imgList = [...response.data]; //s3링크
      console.log(imgList);
      // setImg(imgList);
      const postData = {
        ...postFormData,
        userNum,
        img: imgList,
        name: userName,
        country: userCountry,
      };
      // 새로운 글을 작성한다면 post 요청
      if (!props.postNum) {
        await axios
          .post('/api/post', postData)
          .then(async (response) => {
            console.log(response);
            alert('success post!');
            await axios
              .post(`/api/user/${response.data.post._id}/${userNum}`)
              .then((response) => console.log(response))
              .catch((error) => console.log(error));

            props.setModalOpen(false);
          })
          .catch((error) => console.log(error));
      } else {
        // 기존 글이라면 patch 요청
        await axios
          .patch(`/api/post/${props.postNum}`, postData)
          .then(async (response) => {
            // console.log(response);
            alert('success patch!');
            props.setModalOpen(false);
          })
          .catch((error) => console.log(error));
      }
    });
  };

  useEffect(() => {
    // console.log(postFormData);
    const getContents = async () => {
      return await axios({
        method: 'get',
        url: `/api/post/${props.postNum}`,
      }).then((res) => {
        // console.log(res.data);
        setContent(res.data);
        // setPostFormData(res.data);
      });
    };
    getContents();
    console.log('content', content);
    console.log('content', content?.storeName);
  }, []);

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
                required
                name="storeName"
                onChange={handleChange}
                className="store"
                defaultValue={props.postNum ? content?.storeName : ''}
                placeholder="write store name..."
              ></input>
            </Title>
            <Address>
              <LocationSearchInput
                required
                setPostFormData={setPostFormData}
                address={content?.city}
              />
              <LocationSearchInput
                required
                setPostFormData={setPostFormData}
                address={content?.address}
                type="address"
              />
              {/* {content?.address && (
                <LocationSearchInput
                  required
                  setPostFormData={setPostFormData}
                  address={content?.address}
                />
              )} */}
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
            {/* <AddImages setFiles={setFiles} setPreview={setPreview}></AddImages> */}
            {/* {content?.img && (
              <AddImages
                setFiles={setFiles}
                setPreview={setPreview}
                img={content?.img}
              ></AddImages>
            )} */}
            {/* <AddImages setFiles={setFiles} setPreview={setPreview}></AddImages> */}
            {content?.img ? (
              <AddImages
                setFiles={setFiles}
                setPreview={setPreview}
                img={content.img}
              ></AddImages>
            ) : (
              <AddImages
                setFiles={setFiles}
                setPreview={setPreview}
              ></AddImages>
            )}
            {/* TODO : 이미지 css 적용해서 넣어야함 */}
            {/* {content?.img.map((img: string) => {
              return <img src={img} alt={content?.storeName} />;
            })} */}
          </ImageBox>
          <Tag>
            <CreatableSelectBox
              required
              data={content?.mood}
              setPostFormData={setPostFormData}
              name="mood"
              placeholder="Mood"
            />
            <CreatableSelectBox
              required
              data={content?.foodType}
              setPostFormData={setPostFormData}
              name="foodType"
              placeholder="Food"
            />
          </Tag>
          <Review>
            <textarea
              required
              name="review"
              onKeyUp={checkString}
              onChange={handleChange}
              maxLength={500}
              rows={5}
              defaultValue={props.postNum ? content?.review : ''}
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
