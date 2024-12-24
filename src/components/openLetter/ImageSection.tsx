"use client";

/* eslint-disable react/no-array-index-key */
import Image from "next/image";
import ImageSlider from "../imageSlider";

interface ImageSectionProps {
  imageUrls: string[];
  encodeUrl: (url: string) => string;
}

const ImageSection = ({ imageUrls, encodeUrl }: ImageSectionProps) => {
  if (imageUrls.length === 0) return null;

  return (
    <div className="relative w-full overflow-visible px-4 pb-6 pt-4">
      <ImageSlider>
        {imageUrls.map((url, index) => (
          <div key={index} className="relative h-[280px] w-[280px]">
            <div className="pointer-events-none absolute left-1/2 top-[-60px] z-50 -translate-x-1/2 overflow-visible">
              <Image
                src="/photo/tape_blue.png"
                alt="테이프 위"
                width={81}
                height={40}
                className="drop-shadow-lg"
              />
            </div>

            <div className="relative z-40 h-[280px] w-[280px] overflow-hidden rounded-lg border border-gray-300">
              <Image
                src={encodeUrl(url)}
                alt={`이미지 ${index + 1}`}
                layout="fill"
                objectFit="cover"
                unoptimized
              />
            </div>

            <div className="pointer-events-none absolute bottom-[-50px] left-1/2 z-50 -translate-x-1/2 overflow-visible">
              <Image
                src="/photo/tape_yellow.png"
                alt="테이프 아래"
                width={102}
                height={40}
                className="drop-shadow-lg"
              />
            </div>
          </div>
        ))}
      </ImageSlider>
    </div>
  );
};

export default ImageSection;
