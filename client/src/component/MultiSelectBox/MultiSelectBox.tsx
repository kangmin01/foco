import React, { useState, useEffect } from 'react';
import { MultiSelectBoxWrapper } from './style';
import Select from 'react-select';
import axios from 'axios';

interface Icontent {
  country: string;
  like: number;
  city: string;
  storeName: string;
  img: string;
  foodType: string[];
  mood: string[];
}

const MultiSelectBox = () => {
  const [data, setData] = useState<Icontent[]>([]);

  const getPostData = () => {
    return axios({
      method: 'get',
      // 임시 mock data 연결
      url: 'http://localhost:4000/Data/post.json',
    }).then((res) => {
      setData(res.data.data);
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      await getPostData();
    };
    fetchData();
  }, []);

  // 서버 기능 연결하기 전 임시로 mock 데이터를 불러오기 위한 함수
  // TODO : 서버 기능 완료시, 각 데이터마다 요청 url을 작성해야함
  const cityType = () => {
    const allCityTypes = data.map((content: Icontent) => {
      return content.city;
    });
    return Array.from(new Set(allCityTypes.flat())).map((type: string) => {
      return {
        value: type,
        label: type,
      };
    });
  };

  const foodType = () => {
    const allFoodTypes = data.map((content: Icontent) => {
      return content.foodType;
    });
    return Array.from(new Set(allFoodTypes.flat())).map((type: string) => {
      return {
        value: type,
        label: type,
      };
    });
  };

  const moodType = () => {
    const allMoodTypes = data.map((content: Icontent) => {
      return content.mood;
    });
    return Array.from(new Set(allMoodTypes.flat())).map((type: string) => {
      return {
        value: type,
        label: type,
      };
    });
  };

  return (
    <MultiSelectBoxWrapper>
      <Select isMulti={true} options={cityType()} className="selectBox" />
      <Select isMulti={true} options={foodType()} className="selectBox" />
      <Select isMulti={true} options={moodType()} className="selectBox" />
    </MultiSelectBoxWrapper>
  );
};

export default MultiSelectBox;
