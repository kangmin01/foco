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
  // console.log('>', selectedImages);
  // console.log('>>', props.img);
  const [filesList, setFilesList] = useState<any>([]);

  let compressedImageList: any[] = [];

  const handleImgChange = async (e: any) => {
    if (
      e.target.files.length >= 6 ||
      selectedImages.length + e.target.files.length >= 6
    ) {
      alert('You can only choose up to 5 photos');
      return;
    }

    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 1000,
    };

    try {
      for (const img of e.target.files) {
        const compressedFile = await imageCompression(img, options);
        compressedImageList.push(compressedFile);
      }

      setFilesList((prev: any) => [...prev, ...compressedImageList]);

      const fileArray: string[] = Array.from(compressedImageList).map(
        (file: any) => URL.createObjectURL(file)
      );
      Array.from(compressedImageList).map((file: any) =>
        URL.revokeObjectURL(file)
      );
      compressedImageList = [];

      const newArr = [...fileArray];

      setSelectedImages((prevImages) => prevImages.concat(newArr));
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    // setSelectedImages(props.img);
    props.setFiles([...filesList]);
    // console.log(filesList);
    // props.setPreview([...selectedImages]);
  }, [filesList]);

  useEffect(() => {
    // setSelectedImages(props.img ? props.img : []);
    // setFilesList(props.img ? props.img : []);
    setSelectedImages(props.img ? props.img : []);
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
          All Delete
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
