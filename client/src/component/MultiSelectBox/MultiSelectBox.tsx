import React, { useState, useEffect } from 'react';
import { ContentWrapper, MultiSelectBoxWrapper } from './style';
import Select, { MultiValue } from 'react-select';
import axios from 'axios';
import { Icontent } from '../Icontent';
import Content from '../Content/Content';

interface Iprops {
  country: string;
}

type SelectValue = {
  label: string;
  value: string;
};

const MultiSelectBox = (props: Iprops) => {
  const [data, setData] = useState<Icontent[]>([]);
  const [selectData, setSelectData] = useState<Icontent[]>([]);
  const [citySelect, setCitySelect] = useState<string | undefined>();
  const [moodSelect, setMoodSelect] = useState<string | undefined>();
  const [foodSelect, setFoodSelect] = useState<string | undefined>();

  const getData = () => {
    return axios({
      method: 'get',
      url: `/post?country=${props.country}`,
    }).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, []);

  const getSelectData = () => {
    let url = '';
    if (citySelect) {
      url = `/post?country=${props.country}&city=${citySelect}`;
    } else {
      url = `/post?country=${props.country}`;
    }
    return axios({
      method: 'get',
      url: url,
    }).then((res) => {
      setSelectData(res.data);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getSelectData();
    };
    fetchData();
  }, [citySelect]);

  ////////////////////////

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

  // TODO : 함수 합치기
  const foodType = () => {
    const allFoodTypes = selectData.map((content: Icontent) => {
      return content.foodType;
    });
    return Array.from(new Set(allFoodTypes.flat())).map((type: string) => {
      return {
        value: type,
        label: type,
      };
    });
  };

  const MoodType = () => {
    const allMoodTypes = selectData.map((content: Icontent) => {
      return content.mood;
    });
    return Array.from(new Set(allMoodTypes.flat())).map((type: string) => {
      return {
        value: type,
        label: type,
      };
    });
  };
  const getTypeContent = (
    selected: any,
    type: string,
    setType: any,
    i: any
  ) => {
    const allSelect = selected.map((x: any) => {
      return `&${type}=${x.value}`;
    });
    setType(allSelect.join(''));
  };

  // TODO : 함수 합치기
  const handleMoodChange = (newSelections: MultiValue<SelectValue>) => {
    getTypeContent(newSelections, 'mood', setMoodSelect, moodSelect);
  };

  const handleFoodChange = (newSelections: MultiValue<SelectValue>) => {
    getTypeContent(newSelections, 'foodType', setFoodSelect, foodSelect);
  };

  const handleCityChange = (newSelections: MultiValue<SelectValue>) => {
    getTypeContent(newSelections, 'city', setCitySelect, citySelect);
  };

  return (
    <ContentWrapper>
      <MultiSelectBoxWrapper>
        <Select
          isMulti={true}
          placeholder="City"
          options={cityType()}
          className="selectBox"
          onChange={handleCityChange}
        />
        <Select
          isMulti={true}
          placeholder="Food"
          options={foodType()}
          className="selectBox"
          onChange={handleFoodChange}
        />
        <Select
          isMulti={true}
          placeholder="Mood"
          options={MoodType()}
          className="selectBox"
          onChange={handleMoodChange}
        />
      </MultiSelectBoxWrapper>
      <Content
        country={props.country}
        // postSelect={postSelect.join('')}
        citySelect={citySelect}
        moodSelect={moodSelect}
        foodTypeSelect={foodSelect}
      ></Content>
    </ContentWrapper>
  );
};

export default MultiSelectBox;
