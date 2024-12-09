import Image from "next/image";
import useOverlay from "@/hooks/useoverlay";
import PopUp from "../popUp";

const ActionBar = () => {
  const overlay = useOverlay();

  const handleSimpleStartClick = () => {
    overlay.mount(
      <PopUp
        button="확인"
        title="준비 중 입니다."
        description="현재 기능은 준비 중입니다."
        onConfirm={() => overlay.unmount()}
        onCancel={() => overlay.unmount()}
        unmount={overlay.unmount}
      />,
    );
  };

  return (
    <div className="flex items-center space-x-4">
      <button aria-label="음악" onClick={handleSimpleStartClick}>
        <Image
          src="/writingletter/music.png"
          alt="음악"
          width={24}
          height={24}
        />
      </button>
      <button aria-label="사진 추가" onClick={handleSimpleStartClick}>
        <Image
          src="/writingletter/add_photo.png"
          alt="사진 추가"
          width={24}
          height={24}
        />
      </button>
      <div className="flex items-center space-x-2 text-sm text-grey-900">
        <button aria-label="위치" onClick={handleSimpleStartClick}>
          <Image
            src="/writingletter/location.png"
            alt="위치 아이콘"
            width={24}
            height={24}
          />
        </button>
        <span className="pt-1 text-Caption text-black">서울특별시 한남동</span>
      </div>
    </div>
  );
};

export default ActionBar;
