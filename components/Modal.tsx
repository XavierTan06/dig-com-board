import React from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const NameModal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded z-50">
        {children}
      </div>
    </div>
  );
};

export default NameModal;
