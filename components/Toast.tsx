"use state";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
type toastProps = {
  toastMessage: string;
  visible: boolean;
  ParentVisible: Dispatch<SetStateAction<boolean>>;
};
const Toast = ({ toastMessage, visible, ParentVisible }: toastProps) => {
  const [ToastVisible, setToastVisible] = useState("invisible");
  useEffect(() => {
    if (visible) {
      setToastVisible("visible");
      setTimeout(() => {
        setToastVisible("invisible");
      }, 2000);
      ParentVisible(false);
    }
  }, [visible]);
  return (
    <div className={`toast toast-end ${ToastVisible}`}>
      <div className="alert alert-success">
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
export default Toast;
