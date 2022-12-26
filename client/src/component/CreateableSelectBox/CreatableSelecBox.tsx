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
          setValue((prev) => [...prev, createOption(inputValue)]);
          setInputValue('');
          event.preventDefault();
      }
    }
  };

  useEffect(() => {
    props.setState(value.map((x: any) => x.value));
  }, [value]);

  return (
    <CreatableSelect
      inputValue={inputValue}
      isMulti={true}
      onChange={(newValue: any) => {
        if (newValue.length > 3) return;
        setValue(newValue);
      }}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      value={value}
      options={props.type === 'mood' ? moodsOption : foodsOption}
      placeholder={props.placeholder}
    />
  );
};

export default CreatableSelectBox;
