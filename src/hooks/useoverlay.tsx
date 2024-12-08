import { overlayContext } from "@/providers/overlayProvider";
import { useContext, useMemo, ReactNode, useId } from "react";

/**
 * @author 퍼그
 * @description overlay를 관리하는 훅입니다. 
 * 선언적으로 프로그래밍을 할 수 있습니다.
 * @example
 * 간단하게 overlay를 만들고 안에 컴포넌트를 넣어주면 됩니다.
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
 * 
 * promise와 함께 사용할 수 있습니다.
  const overlay = useOverlay();

  return (
    <button
      // 버튼을 클릭하면
      onClick={async () => {
        const isAgree = await new Promise((resolve) => {
          overlay.mount(
            <PopUp
              button="전달하기"
              description="한 번 보낸 기억은 취소할 수 없습니다."
              title="기억을 전달할까요?"
              onConfirm={() => {
              // 확인 버튼을 눌렀을 때 실행하고 닫습니다.
                resolve(true);
              }}
              onCancel={() => {
              // 취소 버튼을 눌렀을 때 실행하고 닫습니다.
                resolve(false);
              }}
              // overlay를 닫는 함수
              unmount={overlay.unmount}
            />,
          );
        });
        // 확인 버튼을 눌렀을 때
        if (isAgree) console.log("확인 버튼 이후의 라우트로 이동");
        // 취소 버튼을 눌렀을 때
        else console.log("취소 버튼 이후의 라우트로 이동");
      }}
    >
      Open Modal
    </button>
  );
 */
export default function useOverlay() {
  const context = useContext(overlayContext);
  const id = useId();

  if (!context)
    throw new Error("useOverlay must be used within a OverlayProvider");

  const { addOverlay, removeOverlay } = context;

  return useMemo(
    () => ({
      mount: (element: ReactNode) => {
        addOverlay(id, element);
      },
      unmount: () => {
        removeOverlay(id);
      },
    }),
    [addOverlay, removeOverlay, id],
  );
}
