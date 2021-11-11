import { useState } from 'react';

const useImageOrientation = () => {
  const [imgHeight, setImgHeight] = useState('auto');
  const [imgWidth, setImgWidth] = useState('auto');
  const [imageOrientation, setImageOrientation] = useState('');

  const getImageOrientation = (imgUrl: string) => {
    let img = new Image();
    img.src = imgUrl;
    let orientationImg = '';
    // img.onload = function () {
    if (img.naturalWidth > img.naturalHeight) {
      orientationImg = 'landscape';
    } else if (img.naturalWidth < img.naturalHeight) {
      orientationImg = 'portrait';
    } else {
      orientationImg = 'even';
    }
    // }
    return orientationImg;
  };

  const setImageOrientationAndSize = (imgUrl: string) => {
    let imgOrientation = getImageOrientation(imgUrl);
    setImageOrientation(imgOrientation);
    let height=""
    let width=""
    if (imgOrientation === 'portrait') {
      setImgHeight('100%');
      setImgWidth('auto');
      height="100%"
      width="auto"
    } else {
      setImgWidth('100%');
      setImgHeight('auto');
      width="100%"
      height="auto"
    }
    return {width, height}
  };
  return {
    setImageOrientationAndSize,
    imgHeight,
    imgWidth,
    setImgHeight,
    setImgWidth,
    setImageOrientation,
    imageOrientation
  };
};

export default useImageOrientation;
