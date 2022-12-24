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
  const [reviews, setReviews] = useState<never[]>([]);

  useEffect(() => {
    const getReviews = async () => {
      const res = await axios.get('http://localhost:4000/Data/postList.json');
      setReviews(res.data);
    };
    getReviews();
  }, []);

  const handleAddReview = (): void => {
    setModalOpen(true);
  };

  const onClose = (e: React.ChangeEvent<any>): void => {
    setModalOpen(false);
  };

  const handleEdit = (): void => {
    alert('edit');
  };

  const handleDelete = (): void => {
    alert('delete');
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
