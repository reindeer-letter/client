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
      <section className="mx-auto mt-[120px] w-[164px] pb-[313px]">
        <Image
          src="/images/empty-mail-box.png"
          alt="reindeer-cry"
          height={132}
          width={117}
          priority
          className="mx-auto block"
        />
        <span className="mt-5 block whitespace-nowrap text-center text-Title01-M text-grey-400">
          받은 편지가 없습니다
        </span>
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
              <section className="mx-auto flex w-full min-w-[375px] max-w-[600px] rounded-[60px]">
                <section className="relative mx-6 flex-1">
                  <div className="relative bottom-[220px] right-0 flex justify-center whitespace-nowrap rounded border-2 border-primary-200 bg-white px-2 py-2 text-center text-Body02-SB text-primary-200">
                    <span className="flex-shrink-0">
                      내 편지함을 지인에게 공유하고, 첫 기억을 채워보세요!
                    </span>
                    <button
                      className="absolute right-1 text-primary-200 hover:opacity-70"
                      onClick={handleUnmount}
                      type="button"
                    >
                      <Image
                        src="/icons/close.png"
                        alt="close"
                        width={20}
                        height={20}
                        sizes="20px"
                        priority
                      />
                    </button>
                  </div>
                  <div className="absolute bottom-[212px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-primary-200 bg-white" />
                </section>
              </section>
            </motion.div>
          </section>
        )}
      </AnimatePresence>
    </>
  );
}
