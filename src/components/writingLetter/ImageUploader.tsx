"use client";

import React from "react";
import Image from "next/image";
import useImageUpload from "@/hooks/useImageUpload";

interface ImageUploaderProps {
  index: number;
  serverImage: string;
  onUploadSuccess: (url: string) => void;
}

const ImageUploader = ({
  index,
  serverImage,
  onUploadSuccess,
}: ImageUploaderProps) => {
  const { localPreview, isUploading, handleImageUpload, handleImageDelete } =
    useImageUpload(serverImage, onUploadSuccess);

  const inputId = `file-input-${index}`;

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const displayImage = localPreview || "/photo/photo.png";

  return (
    <div
      className="relative mb-8 mt-6 h-[280px] w-[280px] cursor-pointer rounded-lg border border-gray-300"
      onClick={() => document.getElementById(inputId)?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          document.getElementById(inputId)?.click();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="relative z-10 h-full w-full overflow-hidden rounded-lg">
        <Image
          src={displayImage}
          alt="업로드된 사진"
          fill
          unoptimized
          className="aspect-square object-cover"
        />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-[-22px] z-20 -translate-x-1/2">
        <Image
          src="/photo/tape_blue.png"
          alt="테이프 위"
          width={81}
          height={40}
          className="drop-shadow-lg"
        />
      </div>
      <div className="pointer-events-none absolute bottom-[-26px] left-1/2 z-20 -translate-x-1/2">
        <Image
          src="/photo/tape_yellow.png"
          alt="테이프 아래"
          width={102}
          height={40}
          className="drop-shadow-lg"
        />
      </div>

      {localPreview && localPreview !== "/photo/photo.png" && (
        <button
          className="absolute right-0 top-0 z-30"
          onClick={(e) => {
            e.stopPropagation();
            handleImageDelete();
          }}
        >
          <Image
            src="/icons/photo_delete.png"
            alt="이미지 삭제"
            width={45}
            height={45}
          />
        </button>
      )}

      {isUploading && (
        <p className="absolute inset-0 z-30 flex items-center justify-center bg-white/70 text-black">
          업로드 중...
        </p>
      )}

      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
};

export default ImageUploader;
