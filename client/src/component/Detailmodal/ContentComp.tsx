import axios from 'axios';
import { useState, useEffect } from 'react';
import { Icontent } from './Icontent';
import { Content, TagBox, TextBox } from './style';

const ContentComp = () => {
  const [val, setVal] = useState<any[]>([]);
  // const outside = useRef<boolean>(true);
  const getData = () => {
    return axios({
      method: 'get',
      url: 'http://localhost:3000/Data/detailPost.json',
    }).then((res) => {
      setVal(res.data.data);
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
    <div>
      {val.map((detail: Icontent, index: number) => {
        return (
          <Content>
            <TagBox>
              {detail.mood}&nbsp;
              {detail.food}&nbsp;
            </TagBox>
            <TextBox>{detail.review}</TextBox>
          </Content>
        );
      })}
    </div>
  );
};

export default ContentComp;
