import axios from 'axios';
import { useEffect, useState } from 'react';

import Header from '../Header/Header';
import ReviewForm from '../PostForm/PostForm';
// import AddImg from '../PostForm/func/AddImg';

import {
  ReviewButton,
  ReviewContainer,
  ReviewList,
  Title,
  ReviewManagement,
  ReviewPage,
} from './style';

const Post = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [reviews, setReviews] = useState<never[]>([]);

  useEffect(() => {
    const getReviews = async () => {
      const res = await axios.get('http://localhost:3000/Data/postList.json');
      setReviews(res.data);
    };
    getReviews();
  }, []);

  const handleAddReview: any = () => {
    setModalOpen(true);
  };

  const onSubmit: any = () => {
    alert('submit??');
  };

  const onClose: any = (e: any) => {
    // e.preventDefault();
    setModalOpen(false);
  };

  return (
    <ReviewPage>
      {modalOpen && <ReviewForm onSubmit={onSubmit} onClose={onClose} />}
      <Header />
      <ReviewContainer>
        <Title>review management</Title>
        {/* <AddImg></AddImg> */}
        <ReviewManagement>
          <ReviewButton onClick={handleAddReview}>+ review</ReviewButton>
          <ReviewList>
            {reviews.map(({ id, name, src }) => (
              <div key={id} className="review">
                <img src={src} alt="plz" />
                <div>{name}</div>
              </div>
            ))}
          </ReviewList>
        </ReviewManagement>
      </ReviewContainer>
    </ReviewPage>
  );
};

export default Post;
