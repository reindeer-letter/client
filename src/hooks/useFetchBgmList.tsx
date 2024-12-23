import instance from "@/api/instance";

export const fetchBgmList = async () => {
  try {
    const response = await instance.get("/letters/bgm/list");
    const { bgms } = response.data;

    const filteredBgms = bgms.filter(
      (bgm: { name: string }) => bgm.name.trim() !== "",
    );

    return filteredBgms;
  } catch (error) {
    console.error("BGM 목록을 가져오는 데 실패했습니다:", error);
    return [];
  }
};
