import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle } from "react";

const Modal = forwardRef(function Modal({ children, modalClasses }, ref) {
  const dialogRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
      close() {
        dialogRef.current.close();
      },
    };
  });
  return createPortal(
    <dialog ref={dialogRef} className={modalClasses}>
      {children}
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
