"use client";
import { ChangeEvent, useState } from "react";
import { portionSettingImport } from "@/app/global_types/general";
import Toast from "../Toast";
const PortionSetting = (portionImport: portionSettingImport) => {
  const [ToastMessage, setToastMessage] = useState<string>("");
  const [ToastVisible, setToastVisible] = useState<boolean>(false);
  const changePortion = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      portionImport.setPortion(parseInt(event.target.value));
    } catch (error) {
      setToastMessage("Please enter a number");
      setToastVisible(true);
    }
  };
  return (
    <>
      <div className="flex flex-col mb-4 border-2 border-primary rounded-md p-2 bg-background-100">
        <p className="mb-4 text-center">
          Specify your preferred portions here:
        </p>
        <input
          type="text"
          className="text-center input input-bordered input-primary mb-2"
          value={portionImport.portion ? portionImport.portion.toString() : ""}
          onChange={changePortion}
        ></input>
      </div>
      <Toast
        toastMessage={ToastMessage}
        visible={ToastVisible}
        ParentVisible={setToastVisible}
        messageType="error"
      />
    </>
  );
};

export default PortionSetting;
