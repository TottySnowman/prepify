"use client";
import { ChangeEvent } from "react";
import { portionSettingImport } from "@/app/global_types/general";
const PortionSetting = (portionImport: portionSettingImport) => {
  const changePortion = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      portionImport.setPortion(parseInt(event.target.value));
    } catch (error) {
      //TODO Error handling
    }
  };
  return (
    <div className="flex flex-col mb-3 border-2 border-primary rounded-md p-2 bg-slate-700">
      <p className="mb-4 text-center">
        You can set your prefered portions here:
      </p>
      <input
        type="text"
        className="text-center input input-bordered input-primary"
        value={portionImport.portion ? portionImport.portion.toString() : ""}
        onChange={changePortion}
      ></input>
    </div>
  );
};

export default PortionSetting;
