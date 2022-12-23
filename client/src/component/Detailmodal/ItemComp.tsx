import axios from 'axios';
import { useState, useEffect } from 'react';
import { GoTriangleLeft, GoTriangleRight } from 'react-icons/go';
import { Icontent } from './Icontent';
import { ImgArrow, ImgPage, Item, ItemBox } from './style';
import ScrollHorizontal from 'react-scroll-horizontal';

const ItemComp = () => {
  const [val, setVal] = useState<any[]>([]);
  const getData = () => {
    return axios({
      method: 'get',
      url: 'http://localhost:3000/Data/postList.json',
    }).then((res) => {
      setVal(res.data);
      // const itemList = res.data;
      console.log(val);
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, []);
  return (
    <ImgPage>
      <ImgArrow>
        <GoTriangleLeft />
      </ImgArrow>
      <ItemBox>
        <ScrollHorizontal>
          {val.map((detail: Icontent, index: number) => {
            return <Item key={index} src={detail.src} />;
          })}
        </ScrollHorizontal>
      </ItemBox>
      <ImgArrow>
        <GoTriangleRight />
      </ImgArrow>
    </ImgPage>
  );
};

export default ItemComp;
