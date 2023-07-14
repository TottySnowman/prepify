"use client";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
type diet = {
  id: number;
  diet: string;
};
type diet_response = {
  SelectedDiets: diet[];
  All_Diets: diet[];
};
const Diet = () => {
  const [SelectedDiet, setSelectedDiet] = useState<diet[] | null>(null);
  const [AllDiets, setAllDiets] = useState<diet[] | null>(null);
  useEffect(() => {
    const getDiet = async () => {
      const session = await getSession();
      if (session?.user) {
        const response = await fetch(`/api/user/${session.user.id}/diet`);
        if (response.ok) {
          const diets: diet_response = await response.json();
          setAllDiets(diets.All_Diets);
          setSelectedDiet(diets.SelectedDiets);
        }
      }
    };
    getDiet();
  }, []);
  return (
    <div>
      <h1>Diet</h1>
      <br />
      {AllDiets ? (
        <>
          <div>
            {SelectedDiet?.map((diet) => (
              <span>{diet.diet}</span>
            ))}
          </div>
          All available diets:
          <select className="select select-primary w-full max-w-xs">
            <option key={"0"}>Select Diet</option>
            {AllDiets?.map((diet) => (
              <option value={diet.id}>{diet.diet}</option>
            ))}
          </select>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Diet;
