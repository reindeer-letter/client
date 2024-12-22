import { useState } from "react";
import instance from "@/api/instance";

const useVoiceUpload = (onUploadSuccess: (url: string) => void) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const uploadVoice = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");

    setIsUploading(true);
    try {
      const response = await instance.post("/letters/upload/voice", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("업로드 응답:", response.data);
      const { voiceUrl } = response.data;
      onUploadSuccess(voiceUrl);
      return voiceUrl;
    } catch (error) {
      console.error("음성 파일 업로드 실패:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadVoice, isUploading };
};

export default useVoiceUpload;
