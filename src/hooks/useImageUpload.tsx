import { useState } from "react";
import instance from "@/api/instance";

const useImageUpload = (
  defaultImage: string,
  onUploadSuccess: (remoteUrl: string) => void,
) => {
  const [localPreview, setLocalPreview] = useState<string>(defaultImage);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleImageUpload = async (file: File) => {
    const localUrl = URL.createObjectURL(file);
    setLocalPreview(localUrl);

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await instance.post("/letters/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { imageUrl } = response.data;
      onUploadSuccess(imageUrl);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드 실패. 다시 시도해주세요.");
      setLocalPreview(defaultImage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageDelete = () => {
    setLocalPreview("/photo/photo.png");
    onUploadSuccess("");
  };

  return {
    localPreview,
    isUploading,
    handleImageUpload,
    handleImageDelete,
  };
};

export default useImageUpload;
