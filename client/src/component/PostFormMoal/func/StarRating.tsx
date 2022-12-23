import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

<<<<<<< HEAD:client/src/component/PostForm/func/StarRating.tsx
const StarRating = () => {
  const [rating, setRating] = useState<number>(0);
=======
const StarRating: any = (props: any) => {
  const [rating, setRating] = useState<number | undefined>(0);
>>>>>>> feature/FE/post:client/src/component/PostFormMoal/func/StarRating.tsx

  const handleRating = (rate: number): void => {
    setRating(rate);
    props.setStars(rate);
  };

  return (
    <Rating onClick={handleRating} allowFraction={true} transition={true} />
  );
};

export default StarRating;
