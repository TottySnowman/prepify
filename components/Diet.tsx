"use client";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "./Toast";
import type { Diet } from "@prisma/client";

type diet_response = {
  SelectedDiets: Diet[];
  All_Diets: Diet[];
};
const Diet = () => {
  const [SelectedDiets, setSelectedDiets] = useState<Diet[] | null>(null);
  const [AllDiets, setAllDiets] = useState<Diet[] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [ToastMessage, setToastMessage] = useState<string>("");
  const [ToastVisible, setToastVisible] = useState<boolean>(false);
  const router = useRouter();

  const handleDietChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDiet = AllDiets?.find(
      (Diet) => Diet.ID === parseInt(event.target.value)
    );
    if (!selectedDiet) {
      setToastMessage("Diet not found!");
      setToastVisible(true);
      return;
    }
    const updatedSelectedDiets = [...(SelectedDiets || []), selectedDiet];
    setSelectedDiets(updatedSelectedDiets);

    const updatedAllDiets = AllDiets?.filter(
      (Diet) => Diet.ID !== parseInt(event.target.value)
    );
    setAllDiets(updatedAllDiets || []);
  };

  const handleDeleteDiet = (DietID: number) => {
    const selectedDiet = SelectedDiets?.find((Diet) => Diet.ID === DietID);
    if (!selectedDiet) {
      //alert("Diet not found!");
      setToastMessage("Diet not found!");
      setToastVisible(true);
      return;
    }

    const updatedAllDiets = [...(AllDiets || []), selectedDiet];
    const updatedSelectedDiets = SelectedDiets?.filter(
      (Diet) => Diet.ID !== DietID
    );

    setAllDiets(updatedAllDiets);
    setSelectedDiets(updatedSelectedDiets || []);
    setSelectedIndex(0);
  };

  const handleSaveClick = async () => {
    const session = await getSession();
    if (!session?.user) {
      return;
    }
    const resp = await fetch(`api/user/diet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${session.user.accessToken}`,
      },
      body: JSON.stringify({
        selected_diets: SelectedDiets,
      }),
    });
    setToastMessage(await resp.json());
    setToastVisible(true);
    if (resp.ok) {
      router.push("/profile");
    }
  };
  useEffect(() => {
    const getDiet = async () => {
      const session = await getSession();
      if (session?.user) {
        const response = await fetch(`/api/user/diet`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${session.user.accessToken}`,
          },
        });
        if (response.ok) {
          const Diets: diet_response = await response.json();
          setAllDiets(Diets.All_Diets);
          setSelectedDiets(Diets.SelectedDiets);
        }
      }
    };
    getDiet();
  }, []);
  return (
    <>
      <div>
        <div className="mt-4 w-full">
          <span className="prose">
            <h2>Select your desired diets</h2>
          </span>
        </div>

        {SelectedDiets ? (
          <>
            <div>
              <span className="prose">
                <h3 className="mb-4 mt-4">Already selected Diets:</h3>
              </span>
              <div className="grid grid-cols-4 gap-2">
                {SelectedDiets.map((diet) => (
                  <span
                    className="border bg-neutral rounded-full p-2 w-3/4 col-span-1 text-center mb-3 border-primary"
                    key={diet.ID.toString()}
                  >
                    <div className="flex items-center">
                      <span className="flex-grow">{diet.diet}</span>
                      <button
                        className="rounded-full ml-2 border pl-1.5 pr-1.5 flex items-center justify-center border-error"
                        onClick={() => handleDeleteDiet(diet.ID)}
                      >
                        X
                      </button>
                    </div>
                  </span>
                ))}
              </div>
            </div>
          </>
        ) : null}
        <span className="prose">
          <h3 className="mb-4">Add your Diets</h3>
        </span>
        {AllDiets ? (
          <>
            <select
              className="select select-primary w-full max-w-xs"
              onChange={handleDietChange}
              value={selectedIndex}
            >
              <option key={"0"}>Select Diet</option>
              {AllDiets.map((Diet) => (
                <option value={Diet.ID} key={Diet.ID.toString()}>
                  {Diet.diet}
                </option>
              ))}
            </select>
          </>
        ) : (
          <span className="prose">
            <h3>Whoops seems like there are no Diets to choose from!</h3>
          </span>
        )}
        <div className="flex float-right pr-9">
          <button className="btn btn-primary" onClick={() => handleSaveClick()}>
            Save Diets!
          </button>
        </div>
      </div>
      <Toast
        toastMessage={ToastMessage}
        visible={ToastVisible}
        ParentVisible={setToastVisible}
      />
    </>
  );
};

export default Diet;
