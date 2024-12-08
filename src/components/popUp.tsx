import Modal from "./modal";

interface PopUpProps {
  title: string;
  description: string;
  button: string;
  unmount: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * @author 퍼그
 * @returns overlay PopUp
 * @description overlay와 함께 쓰는 PopUp 컴포넌트입니다.
 * 선언적으로 프로그래밍을 할 수 있습니다.
 * 
 * 간단하게 overlay를 만들고 안에 컴포넌트를 넣어주면 됩니다.
 * 
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
  
  promise와 함께 사용할 수 있습니다.
 * 
  // overlay 하나 생성
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
export default function PopUp({
  button,
  description,
  title,
  unmount,
  onConfirm,
  onCancel,
}: PopUpProps) {
  return (
    <Modal closeOnFocusOut onCancel={onCancel} unmount={unmount}>
      <Modal.HeaderWithClose />
      <Modal.Title className="mt-5">{title}</Modal.Title>
      <Modal.Description className="mt-2">{description}</Modal.Description>
      <Modal.Button className="mt-[42px]" type="button" onConfirm={onConfirm}>
        {button}
      </Modal.Button>
    </Modal>
  );
}
