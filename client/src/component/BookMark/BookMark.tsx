import React, { useState } from 'react';
import {
  BookMarkWrapper,
  BookMarkTitle,
  SelectBoxWrapper,
  Right,
  Left,
} from './style';
import DropDown from '../DropDown/DropDown';
import MultiSelectBox from '../MultiSelectBox/MultiSelectBox';
import Content from '../Content/Content';

const BookMark = () => {
  const [country, setCountry] = useState<string>('South Korea');

  return (
    <BookMarkWrapper>
      <Left>
        <BookMarkTitle>My BookMark</BookMarkTitle>
        <SelectBoxWrapper>
          <DropDown />
          <MultiSelectBox />
        </SelectBoxWrapper>
      </Left>
      <Right>
        <Content country={country}></Content>
      </Right>
    </BookMarkWrapper>
  );
};

export default BookMark;
