import type { ReactNode } from "react";
import CloseIcon from "../../assets/icons/CloseIcon.png";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
  showCloseButton?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-2xl",
  showCloseButton = true,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white rounded-lg shadow-xl ${maxWidth} w-full max-h-[90vh] overflow-hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          {showCloseButton && (
            <div
              onClick={onClose}
              className="cursor-pointer hover:scale-110 transition-transform duration-200"
            >
              <img src={CloseIcon} alt="Close" className="w-6 h-6" />
            </div>
          )}
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
