import styled from 'styled-components';
import { Title } from '../Country/style';
import { DropDownWrapper } from '../DropDown/style';

export const BookMarkWrapper = styled.div`
  /* display: flex;
  flex-direction: column; */
  /* flex-wrap: wrap; */
  padding-top: 150px;
  /* align-items: center; */
`;

export const BookMarkTitle = styled(Title)`
  padding-bottom: 30px;
`;

export const SelectBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 1400px; */

  &:nth-child(2) {
    display: flex;
    align-items: center;
  }
`;
