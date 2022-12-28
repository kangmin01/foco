import { useParams } from 'react-router';
import { CountryWrapper, Title } from './style';
import MultiSelectBox from '../MultiSelectBox/MultiSelectBox';

const Country = () => {
  const params = useParams();
  const country: string = params.country as string;
  const title: string = country;

  return (
    <CountryWrapper>
      <Title>{title}</Title>
      <MultiSelectBox country={country} title={title} />
    </CountryWrapper>
  );
};

export default Country;
