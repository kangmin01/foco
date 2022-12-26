import React, { useState } from 'react';
import { BookMarkWrapper, BookMarkTitle, SelectBoxWrapper } from './style';
import DropDown from '../DropDown/DropDown';
import MultiSelectBox from '../MultiSelectBox/MultiSelectBox';

const BookMark = () => {
  // bookmark 서버 연결 전 임시로 데이터 넣음
  const [country, setCountry] = useState<string>('South Korea');

  return (
    <BookMarkWrapper>
      <BookMarkTitle>My BookMark</BookMarkTitle>
      <SelectBoxWrapper>
        <DropDown />
        <MultiSelectBox country={country} />
      </SelectBoxWrapper>
    </BookMarkWrapper>
  );
};

export default BookMark;
