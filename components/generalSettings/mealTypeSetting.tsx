"use client";
import { mealTypeSettingImport } from "@/app/global_types/general";
import { useState } from "react";
import Toast from "../Toast";

const MealTypeSetting = (mealTypeSettingImport: mealTypeSettingImport) => {
  const [ToastMessage, setToastMessage] = useState<string>("");
  const [ToastVisible, setToastVisible] = useState<boolean>(false);
  const setNewMealType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMeal = mealTypeSettingImport.allMealTypes?.find(
      (mealType) => mealType.ID === parseInt(event.target.value)
    );
    if (!selectedMeal) {
      setToastMessage("No real meal type selected!");
      setToastVisible(true);
      return;
    }
    mealTypeSettingImport.setMealType(selectedMeal);
  };

  return (
    <>
      <div className="flex flex-col mb-4 border-2 border-primary rounded-md p-2 bg-background-100">
        <p className="mb-4 text-center">Set your prefered meal type here:</p>
        <select
          className="select select-primary text-center mb-2"
          onChange={setNewMealType}
          value={mealTypeSettingImport.mealtype?.ID}
        >
          {mealTypeSettingImport.allMealTypes?.map((mealType) => (
            <option key={mealType.ID.toString()} value={mealType.ID}>
              {mealType.name}
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
      <div className="hidden alert-error alert-success"></div>
    </>
  );
};
export default MealTypeSetting;
