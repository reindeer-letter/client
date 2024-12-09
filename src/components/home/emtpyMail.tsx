"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function EmptyMail() {
  const [messageMount, setMessageMount] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMessageMount(false);
    }, 3000);
  }, []);

  const handleUnmount = useCallback(() => {
    setMessageMount(false);
  }, []);

  return (
    <>
      <section className="relative mt-[88px] pb-[116px]">
        <Image
          src="/images/reindeer-cry.png"
          alt="reindeer-cry"
          height={372}
          width={276}
          priority
          className="relative mx-auto mb-12 mt-12"
        />
        <section className="absolute bottom-0 left-0 right-0 top-0 flex justify-center">
          <div className="mt-[118px] w-[276px] text-center text-Title01-M text-grey-300 text-white">
            그리움의 끝은 어디까지일까,
            <br />
            손꼽아 헤아린다.
            <div className="mt-2 text-end text-Caption text-grey-600">
              시인 정광지
            </div>
          </div>
        </section>
      </section>
      <AnimatePresence>
        {messageMount && (
          <section className="fixed bottom-0 left-0 right-0">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <section className="mx-auto flex w-full min-w-[375px] max-w-[600px]">
                <section className="flex-1" />
                <section className="relative flex-1">
                  <div className="relative bottom-[126px] right-5 flex justify-between whitespace-nowrap rounded border border-[#474747] bg-grey-800 px-2 py-2 pr-8 text-center text-Body02-SB text-white">
                    <span className="flex-shrink-0">
                      지인에게 공유하고, 첫 기억을 채워보세요!
                    </span>
                    <button
                      className="absolute right-1 text-white"
                      onClick={handleUnmount}
                      type="button"
                    >
                      <Image
                        src="/icons/close_small.png"
                        alt="close_small"
                        width={20}
                        height={20}
                        sizes="20px"
                        priority
                      />
                    </button>
                  </div>
                  <div className="absolute bottom-[118px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-[#474747] bg-grey-800" />
                </section>
              </section>
            </motion.div>
          </section>
        )}
      </AnimatePresence>
    </>
  );
}
