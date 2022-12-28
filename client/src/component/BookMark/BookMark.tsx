import React, { useState } from 'react';
import { BookMarkWrapper, BookMarkTitle, SelectBoxWrapper } from './style';
import DropDown from '../DropDown/DropDown';
import MultiSelectBox from '../MultiSelectBox/MultiSelectBox';

const BookMark = () => {
  const [country, setCountry] = useState<string>('');
  const title: string = 'My BookMark';
  return (
    <BookMarkWrapper>
      <BookMarkTitle>{title}</BookMarkTitle>
      <SelectBoxWrapper>
        <DropDown setCountry={setCountry} title={title} />
        <MultiSelectBox country={country} title={title} />
      </SelectBoxWrapper>
    </BookMarkWrapper>
  );
};

export default BookMark;
