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
    const selectedAllergy = AllAllergies?.find(
      (allergy) => allergy.ID === parseInt(event.target.value)
    );
    if (!selectedAllergy) {
      alert("Allergy not found!");
      return;
    }
    const updatedSelectedAllergies = [
      ...(SelectedAllergies || []),
      selectedAllergy,
    ];
    setSelectedAllergies(updatedSelectedAllergies);

    const updatedAllAllergies = AllAllergies?.filter(
      (allergy) => allergy.ID !== parseInt(event.target.value)
    );
    setAllAllergies(updatedAllAllergies || []);
  };

  const handleDeleteAllergy = (allergyID: number) => {
    const selectedAllergy = SelectedAllergies?.find(
      (allergy) => allergy.ID === allergyID
    );
    if (!selectedAllergy) {
      alert("Allergy not found!");
      return;
    }

    const updatedAllAllergies = [...(AllAllergies || []), selectedAllergy];
    const updatedSelectedAllergies = SelectedAllergies?.filter(
      (allergy) => allergy.ID !== allergyID
    );

    setAllAllergies(updatedAllAllergies);
    setSelectedAllergies(updatedSelectedAllergies || []);
  };

  const handleSaveClick = () => {};

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
  }, []);

  return (
    <div>
      <h3>Already selected allergies</h3>
      {SelectedAllergies ? (
        <div className="grid grid-cols-5">
          {SelectedAllergies.map((allergy) => (
            <span className="border bg-neutral rounded-full p-2 w-1/2 col-span-1 text-center mb-3">
              {allergy.allergy}
              <button
                className="rounded-full ml-4 border-neutral"
                onClick={() => handleDeleteAllergy(allergy.ID)}
              >
                x
              </button>
            </span>
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

      <button className="btn btn-primary" onClick={handleSaveClick}>
        Save allergies!
      </button>
    </div>
  );
};
export default Allergy;
