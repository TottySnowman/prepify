"use client";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "./Toast";
import { Diet } from "@prisma/client";

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
      alert("Diet not found!"); //TODO remove alert
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
      alert("Diet not found!");
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
    const resp = await fetch(`api/user/${session.user.id}/diet`, {
      method: "POST",
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
        const response = await fetch(`/api/user/${session.user.id}/diet`);
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
        <h1>Diet</h1>
        <br />
        {SelectedDiets ? (
          <>
            <div>
              <h2>Already selected Diets:</h2>
              <br />
              <div className="grid grid-cols-5">
                {SelectedDiets.map((diet) => (
                  <span
                    className="border bg-neutral rounded-full p-2 w-1/2 col-span-1 text-center mb-3"
                    key={diet.ID.toString()}
                  >
                    {diet.diet}
                    <button
                      className="rounded-full ml-4 border-neutral"
                      onClick={() => handleDeleteDiet(diet.ID)}
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </>
        ) : null}
        <h3 className="mb-4">Add your Diets</h3>
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
          <h4>Whoops seems like there are no Diets to choose from!</h4>
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
