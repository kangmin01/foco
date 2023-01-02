import React, { useState, useEffect } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import FindCity from './FindCity';
import { v4 as uuidv4 } from 'uuid';

export function randomId(): string {
  return uuidv4();
}

const LocationSearchInput: any = (props: any) => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = React.useState(false);

  const handleChange = async (address: string) => {
    setAddress(address);

    if (props.type === 'address') {
      props.setPostFormData((prev: any) => ({
        ...prev,
        address: address,
      }));
    } else {
      const place = address.split(',').map((x) => x.trim());
      props.setPostFormData((prev: any) => ({
        ...prev,
        city: place[0],
        country: place[1],
      }));
    }
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

  useEffect(() => {
    setAddress(props.address);
  }, []);

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
              placeholder: props.type === 'address' ? 'Search address' : 'City',
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
