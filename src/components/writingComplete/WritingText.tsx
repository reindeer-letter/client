"use client";

import React from "react";

const MyComponent = () => {
  // 현재 URL의 쿼리 문자열을 가져옵니다.
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const nickname = urlParams.get("nickname"); // nickname 값을 가져옵니다.

  return (
    <div className="mt-auto flex items-center justify-center text-center text-xl font-bold">
      {nickname}에게
      <br />
      편지를 보냈습니다!
    </div>
  );
};

export default MyComponent;
