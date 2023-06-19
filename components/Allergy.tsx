"use client";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

type allergy = {
  ID: number;
  allergy: string;
};
type allergies_response = {
  SelectedAllergies: allergy[];
  Allergies: allergy[];
};

const Allergy = () => {
  const [SelectedAllergies, setSelectedAllergies] = useState<allergy[] | null>(
    null
  );
  const [AllAllergies, setAllAllergies] = useState<allergy[] | null>(null);

  const handleAllergyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    alert(value);
  };
  useEffect(() => {
    const fetchAllergies = async () => {
      const session = await getSession();
      if (session?.user) {
        const response = await fetch(`/api/user/${session.user.id}/allergies`);
        if (response.ok) {
          const allergies: allergies_response = await response.json();
          if (allergies) {
            setAllAllergies(allergies.Allergies);
            setSelectedAllergies(allergies.SelectedAllergies);
          }
        }
      }
    };
    fetchAllergies();
  });

  return (
    <>
      <div>
        <h3>Already selected allergies</h3>

        {SelectedAllergies ? (
          <div className="grid grid-cols-4">
            {SelectedAllergies.map((allergy) => (
              <div>{allergy.allergy}</div>
            ))}
          </div>
        ) : (
          <h4>No allergies selected!</h4>
        )}
        <h3 className="mb-4">Add your allergies</h3>
        {AllAllergies ? (
          <>
            <select
              className="select select-primary w-full max-w-xs"
              onChange={handleAllergyChange}
            >
              <option disabled selected>
                Select Allergy
              </option>
              {AllAllergies.map((allergy) => (
                <option value={allergy.ID}>{allergy.allergy}</option>
              ))}
            </select>
          </>
        ) : (
          <h4>Whoops seems like there are no allergies to choose from!</h4>
        )}
      </div>
    </>
  );
};

export default Allergy;
