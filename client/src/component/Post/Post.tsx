import axios from 'axios';
import { useEffect, useState } from 'react';

import Header from '../Header/Header';

import PostFormModal from '../PostFormMoal/PostFormModal';

import {
  ReviewButton,
  ReviewContainer,
  ReviewList,
  ReviewItem,
  ReviewImageBox,
  ImageHover,
  Image,
  Title,
  ReviewManagement,
  ReviewPage,
  ManagementBox,
  Likes,
} from './style';

import { MdOutlineModeEdit } from 'react-icons/md';
import { RiDeleteBin6Fill } from 'react-icons/ri';

const Post = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const getReviews = async () => {
      const res = await axios.get('http://localhost:4000/Data/postList.json');
      //서버에서 오는 데이터는 무조건 type check
      if (Array.isArray(res.data)) setReviews(res.data);
    };
    getReviews();
    // const getReviews = async () => {
    //   axios
    //     .get('/post/:postNum')
    //     .then((res) => console.log('res', res))
    //     .catch((error) => console.log('err', error));
    // };
    // getReviews();
  }, []);

  const handleAddReview = (): void => {
    setModalOpen(true);
  };

  const onClose = (e: React.ChangeEvent<any>): void => {
    setModalOpen(false);
  };

  const handleEdit = (): void => {
    alert('edit');
    const postNum = 30;
    axios
      .patch(`/post/${postNum}`, {
        user: '제발',
        grade: 2.5,
        storeName: '바껴라 제목',
      })
      .then((res) => console.log(res));
  };

  const handleDelete = (): void => {
    alert('Are you sure you want to delete?');
    // const postNum = 31;
    // axios.delete(`/post/${postNum}`).then((res) => console.log(res));
  };

  return (
    <ReviewPage>
      {modalOpen && <PostFormModal onClose={onClose} />}
      <Header />
      <ReviewContainer>
        <Title>review management</Title>
        <ReviewManagement>
          <ReviewButton onClick={handleAddReview}>+ review</ReviewButton>
          <ReviewList>
            {reviews.map(({ id, name, src }) => (
              <ReviewItem key={id}>
                <ReviewImageBox>
                  <ImageHover className="imageHover">
                    <ManagementBox>
                      <button onClick={handleEdit}>
                        <MdOutlineModeEdit />
                      </button>
                      <button onClick={handleDelete}>
                        <RiDeleteBin6Fill />
                      </button>
                    </ManagementBox>
                    <Likes>컴포넌트 삽입</Likes>
                  </ImageHover>
                  <Image src={src} alt="thumbnail" />
                </ReviewImageBox>
                <div>{name}</div>
              </ReviewItem>
            ))}
          </ReviewList>
        </ReviewManagement>
      </ReviewContainer>
    </ReviewPage>
  );
};

export default Post;
