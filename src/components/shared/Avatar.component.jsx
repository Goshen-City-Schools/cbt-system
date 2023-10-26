/* eslint-disable react/prop-types */
import { Image } from "@chakra-ui/react";
const Avatar = ({ imageUrl, altText, width = 40, height = 40, className }) => {
  return (
    <div
      className={`relative rounded-full ${className}`}
      style={{ width, height }}
    >
      <Image
        src={imageUrl}
        alt={altText}
        objectFit="cover"
        className="rounded-full"
      />
    </div>
  );
};

export default Avatar;
