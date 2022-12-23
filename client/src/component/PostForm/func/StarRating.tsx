import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

const StarRating = () => {
  const [rating, setRating] = useState<number>(0);

  const handleRating = (rate: number) => {
    setRating(rate);
    console.log(rating);
  };

  return (
    <Rating onClick={handleRating} allowFraction={true} transition={true} />
  );
};

export default StarRating;
