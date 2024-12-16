"use client";

import useClickOutside from "@/hooks/useClickOutside";
import {
  createContext,
  CSSProperties,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import cn from "@/lib/cn";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import Button from "./button";

interface ModalContextType {
  close: () => void;
  onCancel?: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

interface ModalProps {
  closeOnFocusOut: boolean;
  unmount: () => void;
  onCancel?: () => void;
  children: ReactNode;
  style?: CSSProperties;
}

export default function Modal({
  children,
  closeOnFocusOut,
  unmount,
  onCancel,
  style,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
    setTimeout(unmount, 400);
  }, [unmount]);

  const modalRef = useClickOutside(() => {
    onCancel?.();
    close();
  });

  useLayoutEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ModalContext.Provider value={{ close, onCancel }}>
      <section
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70",
        )}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0, y: 100 }}
              style={{
                width: "350px",
                padding: "16px",
                paddingBottom: "20px",
                textAlign: "center",
                borderRadius: "12px",
                border: "1px solid #999999",
                backgroundColor: "#ffffff",
                ...style,
              }}
              ref={
                closeOnFocusOut
                  ? (modalRef as RefObject<HTMLElement | null>)
                  : null
              }
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) throw new Error("useModal must be used within a ModalProvider");

  return context;
}

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

function Title({ children, className }: TitleProps) {
  return (
    <h1 className={`text-Head text-primary-200 ${className}`}>{children}</h1>
  );
}

Title.displayName = "Modal.Title";

interface DescriptionProps {
  className?: string;
  children: React.ReactNode;
}

function Description({ className, children }: DescriptionProps) {
  return (
    <h2 className={`text-Body01-R text-grey-600 ${className}`}>{children}</h2>
  );
}

Description.displayName = "Modal.Description";

interface HeaderWithCloseProps {
  className?: string;
}

function HeaderWithClose({ className }: HeaderWithCloseProps) {
  const { close, onCancel } = useModal();
  return (
    <header className={cn("flex items-center justify-end", className)}>
      <button
        type="button"
        onClick={() => {
          onCancel?.();
          close();
        }}
        aria-label="닫기"
        className="relative h-8 w-8"
      >
        <Image src="/icons/close.png" alt="닫기" fill sizes="32" />
      </button>
    </header>
  );
}

HeaderWithClose.displayName = "Modal.HeaderWithClose";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onConfirm?: () => void;
  buttonType?: "Primary" | "abled";
}

function ModalButton({
  children,
  buttonType,
  onConfirm,
  ...props
}: ButtonProps) {
  const { close } = useModal();
  return (
    <Button
      buttonType={buttonType}
      onClick={() => {
        onConfirm?.();
        close();
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

ModalButton.displayName = "Modal.Button";

Modal.Button = ModalButton;
Modal.Title = Title;
Modal.HeaderWithClose = HeaderWithClose;
Modal.Description = Description;
