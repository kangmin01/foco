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

  const userNum = localStorage.getItem('userNum');

  useEffect(() => {
    const getReviews = async () => {
      axios
        .get(`/user/${userNum}`)
        .then((res) => {
          setReviews(res.data.user['post']);
        })
        .catch((err) => console.log(err));
      //서버에서 오는 데이터는 무조건 type check
      // if (Array.isArray(res.data)) setReviews(res.data);
    };
    getReviews();
  }, []);

  const handleEdit = (): void => {
    alert('edit');
  };

  const handleDelete = (): void => {
    alert('Are you sure you want to delete?');
  };

  const handleClick = (e: any) => {
    console.log(e.target.id);
    if (!e.target.id) {
    }
  };

  return (
    <ReviewPage>
      {modalOpen && <PostFormModal setModalOpen={setModalOpen} />}
      <Header />
      <ReviewContainer>
        <Title>review management</Title>
        <ReviewManagement>
          <ReviewButton onClick={() => setModalOpen(true)}>
            + review
          </ReviewButton>
          <ReviewList>
            {reviews.map(({ _id, img, postNum }) => (
              <ReviewItem key={_id}>
                <ReviewImageBox onClick={handleClick}>
                  <ImageHover className="imageHover" id={postNum}>
                    <ManagementBox>
                      <button onClick={handleEdit}>
                        <MdOutlineModeEdit />
                      </button>
                      <button onClick={handleDelete}>
                        <RiDeleteBin6Fill />
                      </button>
                    </ManagementBox>
                  </ImageHover>
                  <Image src={img[0]} alt="thumbnail" />
                </ReviewImageBox>
                <Likes>
                  <span>❤️</span>
                  <span>좋아요 개수</span>
                </Likes>
              </ReviewItem>
            ))}
          </ReviewList>
        </ReviewManagement>
      </ReviewContainer>
    </ReviewPage>
  );
};

export default Post;
