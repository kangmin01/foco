import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

const StarRating: any = (props: any) => {
  const [rating, setRating] = useState<number | undefined>(0);

  const handleRating = (rate: number): void => {
    setRating(rate);
    props.setPostFormData((prev: any) => ({
      ...prev,
      grade: rate,
    }));
  };

  return (
    <Rating onClick={handleRating} allowFraction={true} transition={true} />
  );
};

export default StarRating;
