import { useState, useEffect } from 'react';
import { DropDownWrapper } from './style';
import axios from 'axios';
import Select from 'react-select';
import { Icontent } from './../Icontent';

const DropDown = (props: any) => {
  const [countries, setCountries] = useState<any[]>([]);
  const [country, setCountry] = useState<string>('');
  const userNum = localStorage.getItem('userNum');

  // console.log(countries);
  const options = countries.map((x) => {
    if (props.title != 'My BookMark') {
      return {
        value: x.properties.name,
        label: x.properties.name,
      };
    } else {
      return {
        value: x,
        label: x,
      };
    }
  });

  const findCordinates = (country: string) => {
    return axios({
      method: 'get',
      url: 'http://kdt-sw3-team11.elicecoding.com/Data/coordinates.json',
    }).then((res) => {
      res.data.map((content: any) => {
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
    });
  };

  const getCountriesName = () => {
    return axios({
      method: 'get',
      url: 'http://kdt-sw3-team11.elicecoding.com/Data/worldmap.json',
    }).then((res) => {
      setCountries(res.data.objects.world.geometries);
      console.log(res.data.objects.world.geometries); //배열임
    });
  };

  const getBookMarkCountries = () => {
    return axios({
      method: 'get',
      url: `http://kdt-sw3-team11.elicecoding.com/api/bookmark/${userNum}`,
    }).then((res) => {
      const bookMarkCountries = res.data.map((x: any) => {
        return x.country;
      });
      const uniqueArray = Array.from(new Set(bookMarkCountries));
      setCountries(uniqueArray);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      props.title != 'My BookMark'
        ? await getCountriesName()
        : await getBookMarkCountries();
    };
    fetchData();
  }, []);

  const handleChange = (selected: any) => {
    findCordinates(selected.value);
  };

  const handleCountry = (selected: any) => {
    props.setCountry(selected.value);
    setCountry(selected.value);
  };

  return (
    <DropDownWrapper>
      <Select
        options={options}
        placeholder="Country"
        onChange={props.setCountry ? handleCountry : handleChange}
      />
    </DropDownWrapper>
  );
};

export default DropDown;
