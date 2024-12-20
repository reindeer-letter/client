"use client";

import React from "react";
import Image from "next/image";

interface ProfileCustomizationProps {
  selectedHorn: string;
  selectedScarf: string;
  selectedSkin: string;
  handleOptionClick: (
    hornType: string,
    scarfColor: string,
    skinColor: string,
  ) => void;
}

export default function ProfileCustomization({
  selectedHorn,
  selectedScarf,
  selectedSkin,
  handleOptionClick,
}: ProfileCustomizationProps) {
  return (
    <div className="flex w-full flex-col gap-[24px]">
      {/* 뿔 선택 */}
      <div className="flex items-center gap-[24px]">
        <p className="w-[42px] text-Body02-R text-line-900">뿔</p>
        <div className="flex">
          {["OPTION-01", "OPTION-02", "OPTION-03"].map((horn) => (
            <button
              key={horn}
              type="button"
              onClick={() => handleOptionClick(horn, "", "")}
              className="flex h-[44px] w-[76px] items-center justify-center rounded-[12px]"
            >
              <Image
                src={
                  selectedHorn === horn
                    ? `/profile/horn/${horn}.png`
                    : `/profile/horn/${horn}-inactive.png`
                }
                alt={`뿔 ${horn}`}
                width={46}
                height={22}
              />
            </button>
          ))}
        </div>
      </div>

      {/* 목도리 선택 */}
      <div className="flex items-center gap-[24px]">
        <p className="w-[42px] text-Body02-R text-line-900">목도리</p>
        <div className="flex">
          {["RED", "GREEN", "PURPLE"].map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleOptionClick("", color, "")}
              className="relative flex h-[44px] w-[76px] items-center justify-center rounded-[12px]"
            >
              <Image
                src={`/profile/neckwarmer/${color.toLowerCase()}.png`}
                alt={`목도리 ${color}`}
                width={28}
                height={28}
              />
              {selectedScarf === color && (
                <Image
                  src="/profile/check.png"
                  alt="선택됨"
                  className="absolute"
                  width={76}
                  height={44}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 피부 선택 */}
      <div className="flex items-center gap-[24px]">
        <p className="w-[42px] text-Body02-R text-line-900">피부</p>
        <div className="flex">
          {["BROWN", "WHITE"].map((skin) => (
            <button
              key={skin}
              type="button"
              onClick={() => handleOptionClick("", "", skin)}
              className="relative flex h-[44px] w-[76px] items-center justify-center"
            >
              <Image
                src={`/profile/skin/${skin.toLowerCase()}.png`}
                alt={`피부 ${skin}`}
                width={28}
                height={28}
              />
              {selectedSkin === skin && (
                <Image
                  src="/profile/check.png"
                  alt="선택됨"
                  className="absolute"
                  width={76}
                  height={44}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
