import { useEffect, useState } from "react";
import Allergy from "@/components/Allergy";
import Diet from "@/components/Diet";
import General_Settings from "@/components/General_Settings";
import Cuisine from "@/components/Cuisine";
type tabs = {
  [AllergyTab: string]: boolean;
};
const Profile_Settings = () => {
  const [TabVisibility, setTabVisibility] = useState<tabs>({
    AllergyTab: false,
    CuisineTab: false,
    DietTab: false,
    GeneralTab: false,
  });

  const setTabVisible = (tabname: string) => {
    console.log(TabVisibility);
    setTabVisibility((prevState) => {
      const updatedVisibility: tabs = {};
      for (const key in prevState) {
        updatedVisibility[key] = key === tabname ? !prevState[key] : false;
      }
      return updatedVisibility;
    });
  };

  useEffect(() => {
    setTabVisible("AllergyTab");
  }, []);
  return (
    <div className="col-span-4 grid grid-cols-4">
      <div className="col-span-1 items-center justify-center flex">
        <button
          className={`text-center ${
            TabVisibility.AllergyTab
              ? "underline decoration-2 underline-offset-5 decoration-green-700"
              : ""
          }`}
          onClick={() => setTabVisible("AllergyTab")}
        >
          Allergy
        </button>
      </div>
      <div className="col-span-1 items-center justify-center flex">
        <button
          onClick={() => setTabVisible("CuisineTab")}
          className={`text-center ${
            TabVisibility.CuisineTab
              ? "underline decoration-2 underline-offset-5 decoration-green-700"
              : ""
          }`}
        >
          Cuisine
        </button>
      </div>
      <div className="col-span-1 items-center justify-center flex">
        <button
          onClick={() => setTabVisible("DietTab")}
          className={`text-center ${
            TabVisibility.DietTab
              ? "underline decoration-2 underline-offset-5 decoration-green-700"
              : ""
          }`}
        >
          Diets
        </button>
      </div>
      <div className="col-span-1 items-center justify-center flex">
        <button
          onClick={() => setTabVisible("GeneralTab")}
          className={`text-center ${
            TabVisibility.GeneralTab
              ? "underline decoration-2 underline-offset-5 decoration-green-700"
              : ""
          }`}
        >
          General Settings
        </button>
      </div>
      <div className="col-span-4 mt-0">
        <div className={TabVisibility.AllergyTab ? "" : "hidden"}>
          <Allergy />
        </div>
        <div className={TabVisibility.CuisineTab ? "" : "hidden"}>
          <Cuisine />
        </div>
        <div className={TabVisibility.DietTab ? "" : "hidden"}>
          <Diet />
        </div>
        <div className={TabVisibility.GeneralTab ? "" : "hidden"}>
          <General_Settings />
        </div>
      </div>
    </div>
  );
};
export default Profile_Settings;
