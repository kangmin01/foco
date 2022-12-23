import styled from 'styled-components';

export const MultiSelectBoxWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 70px;
  & .autocomplete-dropdown-container {
    position: absolute;
    z-index: 3;
    width: 322px;
    margin-top: 5px;
    border-radius: 7px;
    color: #000;
  }
  & .suggestion-item {
    padding: 15px;
  }
  & .location-search-input {
    width: 300px;
    border: 1px solid #d8d8d8;
    border-radius: 7px;
  }
  & .selectBox {
    width: 300px;
    margin: 20px;
  }
`;
