"use client";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "./Toast";

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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [ToastMessage, setToastMessage] = useState<string>("");
  const [ToastVisible, setToastVisible] = useState<boolean>(false);
  const [ToastMessageType, setToastMessageType] = useState<string>("");
  const router = useRouter();
  const handleAllergyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAllergy = AllAllergies?.find(
      (allergy) => allergy.ID === parseInt(event.target.value)
    );
    if (!selectedAllergy) {
      setToastMessage("Failed to select allergy!");
      setToastVisible(true);
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
      setToastMessage("Allergy not found!");
      setToastVisible(true);
      return;
    }

    const updatedAllAllergies = [...(AllAllergies || []), selectedAllergy];
    const updatedSelectedAllergies = SelectedAllergies?.filter(
      (allergy) => allergy.ID !== allergyID
    );

    setAllAllergies(updatedAllAllergies);
    setSelectedAllergies(updatedSelectedAllergies || []);
    setSelectedIndex(0);
  };

  const handleSaveClick = async () => {
    const session = await getSession();
    if (!session?.user) {
      return;
    }

    const resp = await fetch(`api/user/allergies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: session?.user?.accessToken!,
      },
      body: JSON.stringify({
        selected_allergies: SelectedAllergies,
      }),
    });
    setToastMessage(await resp.json());
    setToastVisible(true);
    setToastMessageType("success");
    if (resp.ok) {
      router.push("/profile");
    }
  };

  useEffect(() => {
    const fetchAllergies = async () => {
      const session = await getSession();
      if (session?.user) {
        const response = await fetch(`/api/user/allergies`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: session.user.accessToken,
          },
        });
        if (response.ok) {
          const allergies: allergies_response = await response.json();
          if (allergies) {
            setAllAllergies(allergies.Allergies);
            setSelectedAllergies(allergies.SelectedAllergies);
          }
        } else {
          setToastMessage(response.statusText);
          setToastMessageType("error");
          setToastVisible(true);
        }
      }
    };
    fetchAllergies();
  }, []);

  return (
    <>
      <div>
        <span className="prose">
          <h2 className="mb-4">Already selected allergies</h2>
        </span>

        {SelectedAllergies ? (
          <div className="grid grid-cols-5 gap-2">
            {SelectedAllergies.map((allergy) => (
              <span
                className="border bg-neutral rounded-full p-2 w-full col-span-1 text-center mb-3 border-primary"
                key={allergy.ID.toString()}
              >
                <div className="flex items-center">
                  <span className="flex-grow">{allergy.allergy}</span>
                  <button
                    className="rounded-full ml-2 border pl-1.5 pr-1.5 flex items-center justify-center border-error"
                    onClick={() => handleDeleteAllergy(allergy.ID)}
                  >
                    X
                  </button>
                </div>
              </span>
            ))}
          </div>
        ) : (
          <span className="prose">
            <h2 className="mb-4">No allergies selected!</h2>
          </span>
        )}
        <span className="prose">
          <h2 className="mb-4 mt-4">Add your allergies</h2>
        </span>
        {AllAllergies ? (
          <>
            <select
              className="select select-primary w-full max-w-xs"
              onChange={handleAllergyChange}
              value={selectedIndex}
            >
              <option key={"0"}>Select Allergy</option>
              {AllAllergies.map((allergy) => (
                <option value={allergy.ID} key={allergy.ID.toString()}>
                  {allergy.allergy}
                </option>
              ))}
            </select>
          </>
        ) : (
          <span className="prose">
            <h2 className="mb-4 mt-4">
              Whoops seems like there are no allergies to choose from!
            </h2>
          </span>
        )}
        <div className="flex float-right pr-9">
          <button className="btn btn-primary" onClick={() => handleSaveClick()}>
            Save allergies!
          </button>
        </div>
      </div>
      <Toast
        toastMessage={ToastMessage}
        visible={ToastVisible}
        ParentVisible={setToastVisible}
        messageType={ToastMessageType}
      />
    </>
  );
};
export default Allergy;
