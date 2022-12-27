import React, { useState, useEffect } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import FindCity from './FindCity';

const LocationSearchInput: any = (props: any) => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = React.useState(false);

  const handleChange = async (address: string) => {
    setAddress(address);
    props.setPostFormData((prev: any) => ({
      ...prev,
      address: address,
    }));

    const city = await FindCity(address);
    city.filter((x: any) => {
      if (x.types[0] === 'administrative_area_level_1') {
        props.setPostFormData((prev: any) => ({
          ...prev,
          city: x.long_name,
        }));
      }
    });

    city.filter((x: any) => {
      if (x.types[0] === 'country') {
        props.setPostFormData((prev: any) => ({
          ...prev,
          country: x.long_name,
        }));
      }
    });
  };

  const handleSelect: any = async (address: any) => {
    setLoading(true);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log('Success', console.log(latLng), latLng);
        props.setPostFormData((prev: any) => ({
          ...prev,
          lat: latLng.lat,
          lng: latLng.lng,
        }));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error', error);
        setLoading(false);
      });
  };

  useEffect(() => {}, []);
  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Search Places ...',
              // TODO : dafultValue 들어오지 않음..
              defaultValue: props.address,
              className: 'location-search-input',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
