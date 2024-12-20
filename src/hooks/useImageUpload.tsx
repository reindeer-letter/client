import { useState } from "react";
import instance from "@/api/instance";

const useImageUpload = (
  defaultImage: string,
  onUploadSuccess: (url: string) => void,
) => {
  const [uploadedImage, setUploadedImage] = useState<string>(defaultImage);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    try {
      const response = await instance.post("/letters/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { imageUrl } = response.data;
      setUploadedImage(URL.createObjectURL(file));
      onUploadSuccess(imageUrl);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드 실패. 다시 시도해주세요.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageDelete = () => {
    setUploadedImage(defaultImage);
    onUploadSuccess("");
  };

  return { uploadedImage, handleImageUpload, handleImageDelete, isUploading };
};

export default useImageUpload;
