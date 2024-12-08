'use client'
import { useParams, useSearchParams } from "next/navigation"

export default function WritingText (){
    const searchParams = useSearchParams()
    const nickNamequery = searchParams.get('nickName') ?? ''
    const nickName = decodeURIComponent(nickNamequery)

    return(
        <div className="flex items-center justify-center mt-auto text-center font-bold text-xl">
        {nickName}에게<br/>편지를 보냈습니다!
      </div>
    )
}