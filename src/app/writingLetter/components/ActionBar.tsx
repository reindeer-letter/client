import Image from "next/image";

const ActionBar: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
      <button aria-label="음악">
        <Image
          src="/writingletter/music.png"
          alt="음악"
          width={24}
          height={24}
        />
      </button>
      <button aria-label="사진 추가">
        <Image
          src="/writingletter/add_photo.png"
          alt="사진 추가"
          width={24}
          height={24}
        />
      </button>
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Image
          src="/writingletter/location.png"
          alt="위치 아이콘"
          width={24}
          height={24}
        />
        <span className="pt-1 text-Caption text-black">서울특별시 한남동</span>
      </div>
    </div>
  );
};

export default ActionBar;
