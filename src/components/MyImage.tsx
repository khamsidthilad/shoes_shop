import React, { useState } from "react";
import { getFullImagePath } from "../utils/imageHelper";

type MyImageProps = {
  src: string;
  addBaseUrl?: boolean;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
};

const MyImage: React.FC<MyImageProps> = ({
  src,
  addBaseUrl = false,
  alt,
  className,
  style,
  ...rest
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const fullImagePath = addBaseUrl ? getFullImagePath(src) : src;
  console.log("fullImagePath", fullImagePath);

  const imageSrc = fullImagePath && fullImagePath !== "" ? fullImagePath : null;
  console.log("image src", imageSrc);

  if (imageSrc === null) {
    return <img src="/src/assets/shoes.jpeg" alt="" />;
  }

  return (
    <img
      src={error ? "/src/assets/shoes.jpeg" : imageSrc}
      alt={error ? "Error" : alt}
      className={className}
      style={style}
      onLoad={handleLoad}
      onError={handleError}
      {...rest}
    />
  );
};

export default MyImage;
