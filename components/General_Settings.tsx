"use client";
import { getSession } from "next-auth/react";
import { SetStateAction, useEffect, useState } from "react";
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
        const response = await fetch(`/api/user/${session.user.id}/general`);
        if (!response.ok) {
          //TODO Error handling
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
      <h1>Customize your own Profile!</h1>
      <>
        <>
          <div className="grid grid-cols-2 justify-items-stretch gap-2">
            <div className="col-span-1">
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-1">
                  <UsernameSettings
                    username={username as string}
                    setUsername={setUsername}
                  />
                </div>
                <div className="col-span-1">
                  <MealTypeSetting
                    mealtype={mealType}
                    setMealType={setMealType}
                    allMealTypes={allMealTypes}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-1 pr-5">
              <NotionSecretSetting
                notionSecret={notionSecret as string}
                setNotionSecret={setNotionSecret}
              />
            </div>
            <div className="col-span-1">
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-1">
                  <PortionSetting portion={portion} setPortion={setPortion} />
                </div>
                <div className="col-span-1">
                  <MeasureSettings
                    measure={measure}
                    setMeasure={setMeasure}
                    allMeasure={allMeasure}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-1 pr-5"></div>
          </div>
          <div className="flex">
            <div className="justify-start">
              <DeleteAccount />
            </div>

            <div className="justify-end">
              <SaveSettings
                portion={portion}
                notionSecret={notionSecret ? notionSecret : ""}
                selectedMealType={mealType as meal_type}
                username={username ? username : ""}
                measure={measure as measure}
              />
            </div>
          </div>
        </>
      </>
    </>
  );
};
export default General_Settings;
