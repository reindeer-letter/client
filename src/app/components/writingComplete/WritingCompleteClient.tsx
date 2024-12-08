'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LottieLetterSend from '@/app/components/LottieLetterSend';
import WritingText from './WritingText';
import BackButton from '../common/BackButton';

export default function WritingCompleteClient() {
  const router = useRouter();
  const [isLottieComplete, setIsLottieComplete] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showBubble, setShowBubble] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsLoggedIn(!!accessToken);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-svh'>
      <BackButton isLoggedIn={isLoggedIn} />
      <LottieLetterSend onComplete={() => setIsLottieComplete(true)} />
      {isLottieComplete && (
        <>
          <div className="flex-1"></div>
          <WritingText />
          <div className="flex-1"></div>
          <div className="relative">
            {!isLoggedIn && showBubble && (
              <div className="absolute left-1/2 -translate-x-1/2 -top-[30px] z-10 bg-[#762222] text-black px-[4px] py-[6px] rounded-[4px] w-[310px]">
                <div className="absolute w-[9px] h-[11px] bg-[#762222] transform rotate-45 -bottom-[5.5px] left-1/2 -translate-x-1/2"></div>
                <div className="text-center text-white relative z-10 text-sm font-semibold">
                  내 편지함을 만들고 친구들에게 편지를 받아보세요!
                  <button 
                    onClick={() => setShowBubble(false)}
                  >
                    <div className="text-white text-[20px] w-[20px] h-[20px]">×</div>
                  </button>
                </div>
              </div>
            )}
            <div className='w-full flex justify-center p-[16px] h-[116px] z-[51]'>
              <div className='w-[350px] h-[56px] flex items-center justify-center rounded-md bg-white text-black'>
                {isLoggedIn ?'다른 편지 더 선물하기':'내 편��함 만들기'}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 