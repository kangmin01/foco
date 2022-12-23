import axios from 'axios';
import { useState, useEffect } from 'react';
import { Icontent } from './Icontent';
import {
  TitleBox,
  TitleBlock,
  TitleContainer,
  Address,
  Profile,
  Score,
  StoreName,
  Title,
} from './style';

const TitleComp = () => {
  const [val, setVal] = useState<any[]>([]);
  const getData = () => {
    return axios({
      method: 'get',
      url: 'http://localhost:3000/Data/detailPost.json',
    }).then((res) => {
      setVal(res.data.data);
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
    <div>
      {val.map((detail: Icontent, index: number) => {
        return (
          <TitleBox>
            <TitleContainer>
              <TitleBlock>l</TitleBlock>
              <Title>
                <StoreName>{detail.storeName}</StoreName>
                <Address>{detail.address}</Address>
                <Score>{detail.grade}</Score>
              </Title>
            </TitleContainer>
            <Profile src={detail.profile} />
          </TitleBox>
        );
      })}
    </div>
  );
};

export default TitleComp;
