import {
  ImageButton,
  ImageList,
  ImageItem,
  Image,
  ImageOver,
  ImageItemButton,
} from '../style';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { LeftArrow, RightArrow } from './Arrows';
import { useState, useEffect } from 'react';
import { RiCloseFill } from 'react-icons/ri';

import imageCompression from 'browser-image-compression';

const AddImages = (props: any) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setFiles(e.target.files);

    if (e.target.files) {
      if (
        e.target.files.length >= 6 ||
        selectedImages.length + e.target.files.length >= 6
      ) {
        alert('You can only choose up to 5 photos');
        return;
      }

      const compressImage = async (image: File) => {
        try {
          const options = {
            maxSizeMb: 1,
            maxWidthOrHeight: 200,
          };
          return await imageCompression(image, options);
        } catch (e) {
          console.log(e);
        }
      };

      if (e.target.files !== null) {
        for (let i = 0; e.target.files.length; i++) {
          compressImage(e.target.files[i]);
        }
      }

      // blob url 생성
      const fileArray: string[] = Array.from(e.target.files).map((file: any) =>
        URL.createObjectURL(file)
      );

      const newArr = [...fileArray];
      setSelectedImages((prevImages) => prevImages.concat(newArr));
    }
  };

  const handleRemoveImage: any = (idx: number): void => {
    setSelectedImages([
      ...selectedImages.slice(0, idx),
      ...selectedImages.slice(idx + 1, selectedImages.length),
    ]);
  };

  const handleRemoveAllImages = (): void => {
    setSelectedImages([]);
  };

  // useEffect(() => {
  //   if (props.img !== undefined) {
  //     setSelectedImages(props.img);
  //   }
  //   props.setPreview([...selectedImages]);
  // }, []);

  useEffect(() => {
    setSelectedImages(props.img);

    props.setPreview([...selectedImages]);
  }, [props.img]);

  const renderImages = (source: string[]) => {
    return source.map((src: any, idx: number) => {
      return (
        <ImageItem className="imgItem" key={src}>
          <Image>
            <img src={src} alt="Failed to load" />
          </Image>
          <ImageOver>
            <ImageItemButton>
              <button type="button" onClick={() => handleRemoveImage(idx)}>
                <RiCloseFill />
              </button>
            </ImageItemButton>
          </ImageOver>
        </ImageItem>
      );
    });
  };

  type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

  const onWheel = (
    apiObj: scrollVisibilityApiType,
    ev: React.WheelEvent
  ): void => {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

    if (isThouchpad) {
      ev.stopPropagation();
      return;
    }

    if (ev.deltaY < 0) {
      apiObj.scrollNext();
    } else if (ev.deltaY > 0) {
      apiObj.scrollPrev();
    }
  };

  return (
    <div>
      <ImageButton>
        <label>
          Add Images
          <input
            onChange={handleImgChange}
            id="imgInput"
            type="file"
            accept="image/*"
            multiple
          />
        </label>
        <button type="button" onClick={handleRemoveAllImages}>
          전체 삭제
        </button>
      </ImageButton>
      <ImageList>
        {selectedImages.length !== 0 && (
          <ScrollMenu
            onWheel={onWheel}
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
          >
            {renderImages(selectedImages)}
          </ScrollMenu>
        )}
      </ImageList>
    </div>
  );
};

export default AddImages;
