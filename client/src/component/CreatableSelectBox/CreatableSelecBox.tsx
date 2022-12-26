import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';

const CreatableSelectBox = () => {
  return <CreatableSelect isMulti={true} className="selectBox" />;
};

export default CreatableSelectBox;
