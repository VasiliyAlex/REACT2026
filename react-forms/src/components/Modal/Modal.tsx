import {useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type {ReactNode} from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({
  isOpen,
  title,
  onClose,
  children,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEsc = (
      event: KeyboardEvent,
    ) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener(
      'keydown',
      handleEsc,
    );

    return () => {
      document.removeEventListener(
        'keydown',
        handleEsc,
      );
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

 return createPortal(
  <div
    ref={overlayRef}
    onClick={handleOverlayClick}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
  >
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      className="w-[600px] max-w-[90vw] rounded-xl bg-white p-6 outline-none"
    >
      <h2
        id="modal-title"
        className="text-2xl font-bold text-center text-black mb-6"
      >
        {title}
      </h2>

      {children}
    </div>
  </div>,
  document.body,
);
}