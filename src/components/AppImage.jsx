import React from 'react';
import noImageImg from '/assets/images/no_image.png';

function Image({
  src,
  alt = "Image Name",
  className = "",
  ...props
}) {

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.target.src = noImageImg
      }}
      {...props}
    />
  );
}

export default Image;
