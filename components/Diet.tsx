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
          console.log(diets.All_Diets);
          setAllDiets(diets.All_Diets);
          setSelectedDiet(diets.SelectedDiets);
        }
      }
    };
    getDiet();
  }, []);
  return <h1>Diet</h1>;
};

export default Diet;
