"use client";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { userSettings } from "@/app/global_types/general";
import SaveSettings from "./generalSettings/saveSettings";
import UsernameSettings from "./generalSettings/usernameSetting";
import NotionSecretSetting from "./generalSettings/notionSecretSetting";
import PortionSetting from "./generalSettings/portionSetting";
import MealTypeSetting from "./generalSettings/mealTypeSetting";
import MeasureSettings from "./generalSettings/measureSetting";
import DeleteAccount from "./generalSettings/deleteAccount";

import { measure, meal_type } from "@prisma/client";

const General_Settings = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [notionSecret, setNotionSecret] = useState<string | null>(null);
  const [portion, setPortion] = useState<number>(0);
  const [measure, setMeasure] = useState<measure | null | undefined>();
  const [mealType, setMealType] = useState<meal_type | null | undefined>();
  const [allMealTypes, setAllMealTypes] = useState<
    meal_type[] | null | undefined
  >([]);
  const [allMeasure, setAllMeasure] = useState<measure[] | null | undefined>(
    []
  );

  useEffect(() => {
    const getSettings = async () => {
      const session = await getSession();
      if (session?.user) {
        const response = await fetch(`/api/user/general`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${session.user.accessToken}`,
          },
        });
        if (!response.ok) {
          return;
        }
        const responseData: userSettings = await response.json();
        setUsername(responseData.username);
        setNotionSecret(responseData.notionSecret);
        setPortion(responseData.portion);
        setMeasure(responseData.measure);
        setMealType(responseData.selectedMealType);
        setAllMealTypes(responseData.allMealTypes);
        setAllMeasure(responseData.allMeasures);
      }
    };
    getSettings();
  }, []);

  return (
    <>
      <div className="mt-4 mb-4">
        <span className="prose">
          <h2>Customize your own Profile!</h2>
        </span>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 justify-items-stretch gap-2">
        <div className="md:col-span-1">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
            <div className="md:col-span-1">
              <UsernameSettings
                username={username as string}
                setUsername={setUsername}
              />
            </div>
            <div className="md:col-span-1">
              <MealTypeSetting
                mealtype={mealType}
                setMealType={setMealType}
                allMealTypes={allMealTypes}
              />
            </div>
          </div>
        </div>
        <div className="md:col-span-1 pr-5">
          <NotionSecretSetting
            notionSecret={notionSecret as string}
            setNotionSecret={setNotionSecret}
          />
        </div>
        <div className="col-span-1">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
            <div className="md:col-span-1">
              <PortionSetting portion={portion} setPortion={setPortion} />
            </div>
            <div className="md:col-span-1">
              <MeasureSettings
                measure={measure}
                setMeasure={setMeasure}
                allMeasure={allMeasure}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex float-right">
        <DeleteAccount />
        <SaveSettings
          portion={portion}
          notionSecret={notionSecret ? notionSecret : ""}
          selectedMealType={mealType as meal_type}
          username={username ? username : ""}
          measure={measure as measure}
        />
      </div>
    </>
  );
};
export default General_Settings;
