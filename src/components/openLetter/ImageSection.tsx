"use client";

/* eslint-disable react/no-array-index-key */
import Image from "next/image";

interface ImageSectionProps {
  imageUrls: string[];
  encodeUrl: (url: string) => string;
}

const ImageSection = ({ imageUrls, encodeUrl }: ImageSectionProps) => {
  return imageUrls.length > 0 ? (
    <div className="relative flex w-full flex-row space-x-4 overflow-x-auto overflow-y-hidden px-4 pb-6 pt-4">
      <div style={{ display: "flex", gap: 16 }}>
        {imageUrls.map((url, index) => (
          <div key={index} className="relative">
            <div className="pointer-events-none absolute left-1/2 top-[-20px] z-30 -translate-x-1/2">
              <Image
                src="/photo/tape_blue.png"
                alt="테이프 위"
                width={81}
                height={40}
                className="drop-shadow-lg"
              />
            </div>
            <div className="relative z-10 h-[280px] w-[280px] overflow-hidden rounded-lg border border-gray-300">
              <Image
                src={encodeUrl(url)}
                alt={`이미지 ${index + 1}`}
                layout="fill"
                objectFit="cover"
                unoptimized
              />
            </div>

            <div className="pointer-events-none absolute bottom-[-26px] left-1/2 z-30 -translate-x-1/2">
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
      </div>
    </div>
  ) : null;
};

export default ImageSection;
