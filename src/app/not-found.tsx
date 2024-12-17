import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 bg-linkLanding bg-cover bg-center">
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-3xl font-bold text-line-800">404</h1>
        <p className="text-2xl text-line-600">페이지를 찾을 수 없습니다.</p>
      </div>
      <Link
        href="/"
        className="rounded-[60px] bg-line-100 px-4 py-2 text-line-700 hover:bg-line-200"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
