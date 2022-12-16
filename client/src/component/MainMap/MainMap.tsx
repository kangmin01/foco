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
import { MapWrapper, SVG } from './style';

const MainMap = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [country, setCountry] = useState<string>('');
  const [data, setData] = useState<string[]>([]);

  const getPostData = () => {
    return axios({
      method: 'get',
      url: 'http://localhost:3001/Data/post.json',
    }).then((res) => {
      setData(res.data.data);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getPostData();
    };
    fetchData();
  }, []);

  const zoomInMarkers = data.map((content: any) => {
    return {
      markerOffset: 15,
      name: content.location,
      coordinates: [content.lng, content.lat],
    };
  });

  const mapMarker = zoomInMarkers.map(({ name, coordinates }: any) => (
    <Marker key={name} coordinates={coordinates} className="markWrapper">
      {modalOpen && (
        <Link to={`/list/country/${country}/${name}`}>
          <SVG
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="1"
            height="1"
            viewBox="0 0 640 1280"
          >
            <g transform="translate(0,1280) scale(0.1,-0.1)" fill="#fff">
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
          </SVG>
          <text
            textAnchor="middle"
            style={{
              fontFamily: 'NanumSquareRound',
              fill: 'white',
              fontSize: '0.3px',
            }}
          >
            {name}
          </text>
        </Link>
      )}
    </Marker>
  ));

  const showWholeMap = () => {
    gsap.to(`#worldMap`, 1, {
      attr: {
        viewBox: `1000px 1000px`,
      },
    });
    closeModal();
  };

  const openModal = () => {
    setModalOpen(true);
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
  return (
    <MapWrapper>
      <ComposableMap
        className="map"
        projection="geoEquirectangular"
        projectionConfig={{ scale: 180 }}
      >
        <Geographies geography="/worldmap.json">
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
                    fill: '#555',
                    outline: 'none',
                  },
                  hover: {
                    fill: 'skyblue',
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
      </ComposableMap>
      {modalOpen && (
        <Ranking
          country={country}
          closeModal={closeModal}
          showWholeMap={showWholeMap}
        ></Ranking>
      )}
    </MapWrapper>
  );
};
export default MainMap;