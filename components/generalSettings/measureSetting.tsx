"use client";
import { measureSettingImport } from "@/app/global_types/general";
import { useState } from "react";
import Toast from "../Toast";
const MeasureSettings = (measureSettingImport: measureSettingImport) => {
  const [ToastMessage, setToastMessage] = useState<string>("");
  const [ToastVisible, setToastVisible] = useState<boolean>(false);
  const setNewMeasure = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMeasure = measureSettingImport.allMeasure?.find(
      (measure) => measure.ID === parseInt(event.target.value)
    );

    if (!selectedMeasure) {
      setToastMessage("Measure not found!");
      setToastVisible(true);
      return;
    }

    measureSettingImport.setMeasure(selectedMeasure);
  };

  return (
    <>
      <div className="flex flex-col mb-4 border-2 border-primary rounded-md p-2 bg-background-100">
        <p className="mb-4 text-center">Set your prefered measurements here:</p>
        <select
          className="select select-primary text-center mb-2"
          onChange={setNewMeasure}
          value={measureSettingImport.measure?.ID}
        >
          {measureSettingImport.allMeasure?.map((measure) => (
            <option key={measure.ID.toString()} value={measure.ID}>
              {measure.measure}
            </option>
          ))}
        </select>
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

export default MeasureSettings;
