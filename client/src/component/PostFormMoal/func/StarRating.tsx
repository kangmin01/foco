import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    setRating(props.grade);
    // console.log(rating);
    // console.log(props.grade);
  }, [props.grade, rating]);

  return (
    <Rating
      onClick={handleRating}
      allowFraction={true}
      transition={true}
      initialValue={props.grade}
    />
  );
};

export default StarRating;
