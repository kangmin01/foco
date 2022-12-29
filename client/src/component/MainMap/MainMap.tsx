import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import Ranking from '../Ranking/Ranking';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import { MapWrapper, TopWrapper, BottomWrapper } from './style';
import DropDown from '../DropDown/DropDown';
import useGeoLocation from '../useGeolocation/useGeolocation';

// TODO : 타입 에러 해결해야함
interface Icontent {
  country: string;
  city: string;
  lng: number;
  lat: number;
}

interface Ireturn {
  markerOffset: number;
  country: string;
  name: string;
  coordinates: number[];
}

interface Icoordinates {
  name: string;
  width: number;
}

interface IMyLocation {
  lat: number;
  lng: number;
}

const MainMap = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [country, setCountry] = useState<string>('');
  const [data, setData] = useState<string[]>([]);
  const [currentCity, setcurrentCity] = useState<string>('');
  const [path, setPath] = useState<string[]>([]);
  const [myLocation, setMyLocation] = useState<IMyLocation>();
  const location = useGeoLocation();

  const checkMyLocation = () => {
    if (location.loaded) {
      const myLocation = location.coordinates;
      setMyLocation(myLocation);
    }
  };

  const getPostData = () => {
    return axios({
      method: 'get',
      url: `/post`,
    }).then((res) => {
      setData(res.data);
    });
  };

  const getCoordinates = () => {
    return axios({
      method: 'get',
      url: 'http://kdt-sw3-team11.elicecoding.com/Data/coordinates.json',
    }).then((res) => {
      setPath(res.data);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCoordinates();
      await checkMyLocation();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await checkMyLocation();
    };
    fetchData();
  }, [myLocation]);

  const zoomInMarkers = data.map((content: any) => {
    return {
      markerOffset: 15,
      country: content.country,
      name: content.city,
      coordinates: [content.lng, content.lat],
    };
  });

  const mapMarker = zoomInMarkers.map(({ country, name, coordinates }: any) => {
    let color = '#ffe88c';
    let width;
    let height;
    let font;
    if (name === currentCity) {
      color = '#efb71c';
    }

    path.map((content: any) => {
      if (content.name === country) {
        if (content.width > 0 && content.width < 40) {
          width = 1;
          height = 1;
          font = 0.3;
        } else if (content.width > 40 && content.width < 100) {
          width = 2;
          height = 2;
          font = 1;
        } else if (content.width > 100) {
          width = 7;
          height = 7;
          font = 2.5;
        }
      }
    });
    return (
      <Marker key={name} coordinates={coordinates} className="markWrapper">
        {modalOpen && (
          <Link to={`/${country}/${name}`}>
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width={width}
              height={height}
              viewBox="0 0 640 1280"
            >
              <g
                transform="
               translate(-80,1280)
               scale(0.1,-0.1)"
                fill={color}
              >
                <path
                  d="M3042 12790 c-296 -42 -555 -181 -802 -429 -386 -389 -613 -947 -660
                  -1622 -19 -267 9 -658 66 -939 98 -477 289 -854 570 -1119 109 -103 219 -176
                  389 -257 239 -113 295 -194 295 -428 0 -61 -7 -280 -15 -486 -8 -206 -24 -616
                  -35 -910 -11 -294 -29 -771 -40 -1060 -11 -289 -29 -757 -40 -1040 -11 -283
                  -24 -639 -30 -790 -6 -151 -17 -450 -25 -665 -8 -214 -24 -628 -35 -920 -11
                  -291 -27 -708 -36 -925 -23 -586 -23 -722 -1 -795 42 -133 112 -230 220 -303
                  110 -73 195 -97 342 -96 102 1 131 4 192 26 170 60 284 168 342 323 42 111 43
                  152 21 738 -21 587 -48 1324 -80 2222 -11 303 -24 672 -30 820 -5 149 -17 458
                  -25 688 -8 229 -22 605 -30 835 -8 229 -20 541 -25 692 -6 151 -15 397 -20
                  545 -5 149 -17 461 -26 695 -8 234 -13 451 -9 484 10 92 40 160 102 226 45 49
                  77 70 186 126 173 87 278 158 381 255 326 309 535 776 610 1364 92 720 -24
                  1404 -326 1915 -98 166 -179 271 -313 406 -223 224 -447 352 -717 410 -87 18
                  -308 26 -396 14z"
                />
              </g>
            </svg>
            <text
              textAnchor="start"
              style={{
                fontFamily: 'NanumSquareRound',
                fill: color,
                fontSize: `${font}px`,
                fontWeight: `700`,
              }}
              className="cityMarker"
            >
              {name}
            </text>
          </Link>
        )}
      </Marker>
    );
  });

  const myLocationMarker = [
    {
      markerOffset: 15,
      name: ' You are hear!',
      coordinates: [myLocation?.lng, myLocation?.lat],
    },
  ];

  const MyMarker = myLocationMarker.map(
    ({ markerOffset, name, coordinates }: any) => {
      return location.loaded && myLocation !== undefined ? (
        <Marker key={name} coordinates={coordinates}>
          {!modalOpen && (
            <Link to={`/`}>
              <g
                fill="none"
                stroke="#FF5533"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-12, -24)"
              >
                <circle cx="12" cy="10" r="3" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
              </g>
              <text
                textAnchor="middle"
                y={markerOffset}
                style={{
                  fontFamily: 'system-ui',
                  fill: '#383838',
                  fontWeight: '700',
                }}
              >
                {name}
              </text>
            </Link>
          )}
        </Marker>
      ) : (
        'Location data not available yet.'
      );
    }
  );

  const showWholeMap = () => {
    gsap.to(`.map`, 1, {
      attr: {
        viewBox: `-180 140 1150 200`,
      },
    });
    closeModal();
  };

  const openModal = () => {
    setModalOpen(true);
    getPostData();
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const zoomInMap = (e: any, name: string) => {
    let cordinates = e.target.getBBox();
    gsap.to(`.map`, 1, {
      attr: {
        viewBox: `${cordinates.x} ${cordinates.y} ${cordinates.width} ${cordinates.height}`,
      },
    });
    openModal();
    setCountry(name);
  };

  const zoomInMapDropDown = (
    name: string,
    lat: number,
    lng: number,
    width: number,
    height: number
  ) => {
    gsap.to(`.map`, 1, {
      attr: {
        viewBox: `${lat} ${lng} ${width} ${height}`,
      },
    });
    openModal();
    setCountry(name);
  };

  const changeFill = (city: string) => {
    setcurrentCity(city);
  };

  return (
    <MapWrapper>
      <TopWrapper>
        <DropDown zoomInMap={zoomInMapDropDown} />
      </TopWrapper>
      <BottomWrapper>
        <ComposableMap
          className="map"
          projection="geoEquirectangular"
          projectionConfig={{ scale: 180 }}
        >
          <Geographies geography="/Data/worldmap.json">
            {({ geographies }) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  name={geo.properties}
                  onClick={(e: any) => {
                    const { name } = geo.properties;
                    zoomInMap(e, name);
                  }}
                  style={{
                    default: {
                      fill: '#517DA6',
                      outline: 'none',
                    },
                    hover: {
                      fill: '#CEEDFF',
                      outline: 'none',
                      cursor: 'pointer',
                    },
                    pressed: {
                      fill: 'skyblue',
                      outline: 'none',
                    },
                  }}
                />
              ))
            }
          </Geographies>
          {mapMarker}
          {MyMarker}
        </ComposableMap>
        {modalOpen && (
          <Ranking
            country={country}
            closeModal={closeModal}
            showWholeMap={showWholeMap}
            changeFill={changeFill}
          ></Ranking>
        )}
      </BottomWrapper>
    </MapWrapper>
  );
};
export default MainMap;
