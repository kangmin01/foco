import {
  ModalBackground,
  ModalWrapper,
  TitleWrapper,
  Box,
  CloseIcon,
} from './style';
import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import useOpenModal from './useOpenModal';
import { Icontent } from './Icontent';
import IconComp from './IconComp';
import TitleComp from './TitleComp';
import ContentComp from './ContentComp';
import ItemComp from './ItemComp';

interface Iprops {
  closeModal: () => void;
}

const Modal = (props: Iprops) => {
  const [val, setVal] = useState<any[]>([]);
  const getData = () => {
    return axios({
      method: 'get',
      url: 'http://localhost:3000/Data/detailPost.json',
    }).then((res) => {
      setVal(res.data.data);
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, []);
  return (
    <ModalBackground>
      {val.map((index: number) => {
        return (
          <ModalWrapper key={index}>
            <TitleWrapper>
              <IconComp closeModal={props.closeModal} />
              <TitleComp />
            </TitleWrapper>
            <Box>
              <ItemComp />
              <ContentComp />
            </Box>
          </ModalWrapper>
        );
      })}
    </ModalBackground>
  );
};

export default Modal;
