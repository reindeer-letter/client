"use client";

import { useInView } from "motion/react";
import { RefObject, useEffect, useRef } from "react";

interface InterceptionAreaProps {
  children?: React.ReactNode;
  func: () => void;
}

// IntersectionObserver를 사용하여 화면에 보이는지 확인하는 컴포넌트
export default function IntersectionArea({
  children,
  func,
}: InterceptionAreaProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as RefObject<Element>, {
    amount: "some",
    margin: "-100px 0px 0px 0px",
  });

  useEffect(() => {
    if (isInView) func();
  }, [isInView, func]);

  return <section ref={ref}>{children}</section>;
}
