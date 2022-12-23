import { useState, useEffect } from 'react';
import { DropDownWrapper } from './style';
import axios from 'axios';
import Select from 'react-select';

const DropDown = (props: any) => {
  const [countries, setCountries] = useState<any[]>([]);
  const [path, setPath] = useState<string[]>([]);

  const options = countries.map((x) => {
    return {
      value: x.properties.name,
      label: x.properties.name,
    };
  });

  const findCordinates = (country: string) => {
    path.map((content: any) => {
      if (country == content.name) {
        props.zoomInMap(
          content.name,
          content.lat,
          content.lng,
          content.width,
          content.height
        );
      }
    });
  };

  const getCountriesName = () => {
    return axios({
      method: 'get',
      url: 'http://localhost:4000/Data/worldmap.json',
    }).then((res) => {
      setCountries(res.data.objects.world.geometries);
    });
  };

  const getCoordinates = () => {
    return axios({
      method: 'get',
      url: 'http://localhost:4000/Data/coordinates.json',
    }).then((res) => {
      setPath(res.data);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCountriesName();
    };
    fetchData();
  }, []);

  const handleChange = (selected: any) => {
    getCoordinates();
    findCordinates(selected.value);
  };

  return (
    <DropDownWrapper>
      <Select options={options} onChange={handleChange} />
    </DropDownWrapper>
  );
};

export default DropDown;
