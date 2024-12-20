import React from "react";
import Image from "next/image";
import useImageUpload from "@/hooks/useImageUpload";

const ImageUploader = ({
  defaultImage,
  onUploadSuccess,
}: {
  defaultImage: string;
  onUploadSuccess: (url: string) => void;
}) => {
  const { uploadedImage, handleImageUpload, handleImageDelete, isUploading } =
    useImageUpload(defaultImage, onUploadSuccess);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

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
        src={uploadedImage}
        alt="업로드된 사진"
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

      {uploadedImage !== defaultImage && (
        <button
          className="absolute right-0 top-0 z-20 rounded-full bg-black p-1"
          onClick={handleImageDelete}
        >
          <Image
            src="/icons/close.png"
            alt="이미지 삭제"
            width={26}
            height={26}
          />
        </button>
      )}

      {isUploading && <p>업로드 중...</p>}

      <input
        id="file-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
};

export default ImageUploader;
