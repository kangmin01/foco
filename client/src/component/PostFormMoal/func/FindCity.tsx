import Geocode from 'react-geocode';

Geocode.setApiKey(`AIzaSyC8LUClf1iydfy5ZZsGcXlj61tJpJeQMT8`);
Geocode.setLanguage('en');
Geocode.setRegion('es');
Geocode.enableDebug();

const FindCity = async (address: string) => {
  return Geocode.fromAddress(address).then((response) => {
    const result = response.results[0].address_components;
    return result;
  });
};

export default FindCity;
