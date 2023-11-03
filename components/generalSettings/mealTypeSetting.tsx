"use client";
import { mealTypeSettingImport } from "@/app/global_types/general";

const MealTypeSetting = (mealTypeSettingImport: mealTypeSettingImport) => {
  const setNewMealType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMeal = mealTypeSettingImport.allMealTypes?.find(
      (mealType) => mealType.ID === parseInt(event.target.value)
    );
    if (!selectedMeal) {
      alert("No real meal type selected!"); //TODO remove alert
      return;
    }
    mealTypeSettingImport.setMealType(selectedMeal);
  };

  return (
    <div className="flex flex-col mb-3 border-2 border-primary rounded-md p-2 bg-slate-700">
      <p className="mb-4 text-center">Set your prefered meal type here:</p>
      <select
        className="select select-primary text-center"
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
  );
};
export default MealTypeSetting;
