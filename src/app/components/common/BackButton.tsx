'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface BackButtonProps {
  isLoggedIn: boolean;
}

export default function BackButton({ isLoggedIn }: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (isLoggedIn) {
      router.push('/home')
    } else {
      router.push('/invitation')
    }
  }

  return (
    <button 
      onClick={handleClick}
      className="z-50 flex items-center ml-auto"
    >
      <Image src="/images/close.svg" alt="close" width={24} height={24} />
    </button>
  )
} 