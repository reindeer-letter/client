"use client";

import PopUp from "@/components/popUp";
import useOverlay from "@/hooks/useoverlay";

export default function Page() {
  const overlay = useOverlay();

  return (
    <button
      onClick={() =>
        overlay.mount(
          <PopUp
            button="전달하기"
            description="한 번 보낸 기억은 취소할 수 없습니다."
            title="기억을 전달할까요?"
            onConfirm={() => {
              console.log("확인 버튼 이후의 라우트로 이동");
            }}
            onCancel={() => {
              console.log("취소 버튼 이후의 라우트로 이동");
            }}
            unmount={overlay.unmount}
          />,
        )
      }
    >
      Open Modal
    </button>
  );
}
