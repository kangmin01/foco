import React, { useState, useEffect, KeyboardEventHandler } from 'react';
import CreatableSelect from 'react-select/creatable';

const CreatableSelectBox = (props: any) => {
  const moodsOption = [
    { value: 'comfort', label: 'comfort' },
    { value: 'romantic', label: 'romantic' },
    { value: 'special', label: 'special' },
  ];

  const foodsOption = [
    { value: 'tteokbokki', label: 'tteokbokki' },
    { value: 'cheese cake', label: 'cheese cake' },
    { value: 'porkcutlet', label: 'porkcutlet' },
  ];

  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState<any[]>([]);

  const createOption = (label: string) => ({
    label,
    value: label,
  });

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    if (value.length > 2) {
      alert('You can recommend only 3 tags');
      return;
    } else {
      switch (event.key) {
        case 'Enter':
        case 'Tab':
          console.log(createOption(inputValue));
          setValue((prev) => [...prev, createOption(inputValue)]);
          // props.setPostFormData((prev: any) => [
          //   ...prev,
          //   [props.name]: inputValue,
          // ]);
          setInputValue('');
          event.preventDefault();
      }
    }
  };

  const handleChange = (newValue: any) => {
    if (newValue.length > 3) return;
    setValue(newValue);
    // props.setPostFormData((prev: any) => ({
    //   ...prev,
    //   [props.name]: newValue.map((x: any) => x.value),
    // }));
  };

  // const [editValue, setEditValue] = useState<any>([]);
  // setEditValue({ ...props.mood });

  // const initialValue = () => {
  //   if (props.data !== undefined) {
  //     console.log(props.data);
  //     // for (let i = 0; i < props.data.length; i++) {
  //     //   setEditValue((prev: any) => [...prev, createOption(props.mood[i])]);
  //     // }
  //     // console.log(props.mood.length);
  //   }
  // };

  useEffect(() => {
    // initialValue();
    // props.setPostFormData(value.map((x: any) => x.value));
    props.setPostFormData((prev: any) => ({
      ...prev,
      [props.name]: value.map((x: any) => x.value),
    }));
  }, [inputValue, value]);

  return (
    <CreatableSelect
      inputValue={inputValue}
      isMulti={true}
      onChange={handleChange}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      value={value}
      options={props.name === 'mood' ? moodsOption : foodsOption}
      placeholder={props.placeholder}
    />
  );
};

export default CreatableSelectBox;
