// "use client";

// import { useParams } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { Letter } from "@/types/letters";
// import useGetFetch from "@/hooks/useGetFetch";

// export default function OpenLetter() {
//   const { id } = useParams();
//   const { data: letter } = useGetFetch<Letter>({ route: `/letters/${id}` });

//   return (
//     <div className="bg-custom-background flex h-screen flex-col bg-grey-900 text-white">
//       <div className="p-5 px-4 pb-3">
//         <Link href="/home">
//           <Image
//             src="/icons/backspace.svg"
//             alt="backspace"
//             width={24}
//             height={24}
//           />
//         </Link>
//       </div>

//       <main className="flex w-full flex-1 flex-col items-center justify-between">
//         <header className="flex w-full flex-col space-y-4">
//           <div className="p-2 px-4 pb-4" />
//           <div className="flex w-full justify-end border-none bg-transparent p-2 px-4 font-handwriting text-sm text-black">
//             <div>from: {letter?.senderNickname}</div>
//           </div>
//           <hr className="border-b-1 w-full border-black" />
//           <div className="w-full">
//             <div className="w-full max-w-md border-none bg-transparent p-2 px-4 font-handwriting text-3xl text-black placeholder-gray-500 focus:outline-none">
//               {letter?.title}
//             </div>
//           </div>
//         </header>

//         <div className="w-full flex-1">
//           <div className="h-full w-full resize-none rounded-lg bg-transparent p-4 font-handwriting text-2xl text-black placeholder-gray-500 focus:outline-none">
//             {letter?.description}
//           </div>
//         </div>

//         <div className="relative flex w-full justify-center">
//           {letter?.imageUrls &&
//             letter.imageUrls.map((url) => (
//               <Image key={url} src={url} alt="Letter Image" fill priority />
//             ))}
//         </div>
//       </main>
//     </div>
//   );
// }
