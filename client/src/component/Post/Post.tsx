import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { AiFillHeart } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

const Post = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [postNum, setPostNum] = useState<number>(0);
  const [reviews, setReviews] = useState<any[]>([]);

  const userNum = localStorage.getItem('userNum');

  const getReviews = async () => {
    const res = await axios.get(`/user/${userNum}`);
    setReviews(res.data.user.post);
  };

  useEffect(() => {
    getReviews();
  }, []);

  const handleEdit = (postNum: number): void => {
    setModalOpen(true);
    setPostNum(postNum);
  };

  const handleDelete = (postNum: number) => {
    alert('Are you sure you want to delete?');
    axios.delete(`/post/${postNum}`).then((res) => {
      console.log(res);
      axios.get(`/user/${userNum}`).then((res) => {
        setReviews(res.data.user.post);
      });
    });
  };

  return (
    <ReviewPage>
      {modalOpen && (
        <PostFormModal
          setModalOpen={setModalOpen}
          setPostNum={setPostNum}
          postNum={postNum}
        />
      )}
      <Header />
      <ReviewContainer>
        <Title>review management</Title>
        <ReviewManagement>
          <ReviewButton onClick={() => setModalOpen(true)}>
            + review
          </ReviewButton>
          <ReviewList>
            {reviews.map(({ storeName, img, postNum, likeUsers }) => (
              <ReviewItem key={postNum}>
                <ReviewImageBox>
                  <ImageHover className="imageHover">
                    <ManagementBox>
                      <button
                        onClick={() => {
                          handleEdit(postNum);
                        }}
                      >
                        <MdOutlineModeEdit />
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(postNum);
                        }}
                      >
                        <RiDeleteBin6Fill />
                      </button>
                    </ManagementBox>
                  </ImageHover>
                  <Image src={img[0]} alt={storeName}></Image>
                </ReviewImageBox>
                <Likes>
                  <span>
                    <AiFillHeart />
                  </span>
                  <span>{likeUsers.length}</span>
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
