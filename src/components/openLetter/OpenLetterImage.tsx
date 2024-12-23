import React from "react";
import Image from "next/image";

const ImageUploader = ({
  defaultImage,
  key,
}: {
  defaultImage: string;
  key?: string;
}) => {
  return (
    <div
      className="relative mb-4 h-[280px] w-[280px] cursor-pointer rounded-lg border border-gray-300"
      onClick={() => document.getElementById("file-input")?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          document.getElementById("file-input")?.click();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <Image
        src={defaultImage}
        alt={key || "사진"}
        fill
        className="aspect-square object-cover"
      />

      <div className="absolute left-[50%] top-[-22px] z-10 -translate-x-1/2">
        <Image
          src="/photo/tape_blue.png"
          alt="테이프 위"
          width={81}
          height={40}
        />
      </div>
      <div className="absolute bottom-[-26px] left-[50%] z-10 -translate-x-1/2">
        <Image
          src="/photo/tape_yellow.png"
          alt="테이프 아래"
          width={102}
          height={40}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
