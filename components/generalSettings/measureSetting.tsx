"use client";
import { measureSettingImport } from "@/app/global_types/general";
import { useEffect } from "react";
const MeasureSettings = (measureSettingImport: measureSettingImport) => {
  const setNewMeasure = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMeasure = measureSettingImport.allMeasure?.find(
      (measure) => measure.ID === parseInt(event.target.value)
    );

    if (!selectedMeasure) {
      alert("Measure not found!"); //TODO remove alert
      return;
    }

    measureSettingImport.setMeasure(selectedMeasure);
  };

  return (
    <div className="flex flex-col mb-3 border-2 border-primary rounded-md p-2 bg-slate-700">
      <p className="mb-4 text-center">Set your prefered measurements here:</p>
      <select
        className="select select-primary text-center"
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
  );
};

export default MeasureSettings;
