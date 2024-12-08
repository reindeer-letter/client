'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function BackButton() {
  const router = useRouter()

  return (
    <button 
      onClick={() => router.back()}
      className="z-50 flex items-center ml-auto"
    >
      <Image src="/img/close.svg" alt="close" width={24} height={24} />
    </button>
  )
} 