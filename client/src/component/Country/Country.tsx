import { useParams } from 'react-router';
import { CountryWrapper, Title } from './style';
import MultiSelectBox from '../MultiSelectBox/MultiSelectBox';
// import Content from '../Content/Content';

const Country = () => {
  const params = useParams();
  const country: string = params.country as string;

  return (
    <CountryWrapper>
      <Title>{country}</Title>
      <MultiSelectBox country={country} />
    </CountryWrapper>
  );
};

export default Country;
