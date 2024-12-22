"use client";

import { useState } from "react";

export interface SelectedImage {
  file: File | null;
  previewUrl: string;
}

export default function useImagePreview(initialCount = 3) {
  const [images, setImages] = useState<SelectedImage[]>(
    Array.from({ length: initialCount }, () => ({
      file: null,
      previewUrl: "",
    })),
  );
  const handleSelectImage = (
    index: number,
    file: File | null,
    preview: string,
  ) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = { file, previewUrl: preview };
      return updated;
    });
  };

  return { images, setImages, handleSelectImage };
}
