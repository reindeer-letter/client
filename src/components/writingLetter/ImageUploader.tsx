"use client";

import React, { ChangeEvent } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  index: number;
  previewUrl: string;
  onSelectImage: (index: number, file: File | null, preview: string) => void;
}

const ImageUploader = ({
  index,
  previewUrl,
  onSelectImage,
}: ImageUploaderProps) => {
  const inputId = `file-input-${index}`;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      if (typeof loadEvent.target?.result === "string") {
        const base64Url = loadEvent.target.result;
        onSelectImage(index, file, base64Url);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectImage(index, null, "");
  };

  const displayImage = previewUrl || "/photo/photo.png";

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
          alt="미리보기 이미지"
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

      {previewUrl && (
        <button className="absolute right-0 top-0 z-30" onClick={handleDelete}>
          <Image
            src="/icons/photo_delete.png"
            alt="이미지 삭제"
            width={45}
            height={45}
          />
        </button>
      )}

      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader;
