'use client'

import letterSend from '../../public/letter_send.json'
import Lottie from "lottie-react";
import { useState } from 'react';

export default function LottieLetterSend({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleComplete = () => {
    setIsVisible(false);
    onComplete();
  };

  return (
    <div 
      className={`fixed inset-0 w-full min-h-svh bg-black z-50 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <Lottie 
        loop={false}
        animationData={letterSend} 
        style={{ width: '351px', height: '100%' }} 
        onComplete={handleComplete}
      />
    </div>
  );
}
