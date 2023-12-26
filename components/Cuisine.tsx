"use cleint";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "./Toast";
import type { Cuisine } from "@prisma/client";

type user_cuisine_get_response = {
  selectedCuisine: Cuisine[] | null;
  AllCuisine: Cuisine[];
};
const Cuisine = () => {
  const [SelectedCuisine, setSelectedCuisine] = useState<Cuisine[] | null>(
    null
  );
  const [AllCuisine, setAllCuisine] = useState<Cuisine[] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [ToastMessage, setToastMessage] = useState<string>("");
  const [ToastVisible, setToastVisible] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCuisine = AllCuisine?.find(
      (Cuisine) => Cuisine.ID === parseInt(event.target.value)
    );
    if (!selectedCuisine) {
      setToastMessage("Failed to select cuisine!");
      setToastVisible(true);
      return;
    }
    const updatedSelectedCuisine = [
      ...(SelectedCuisine || []),
      selectedCuisine,
    ];
    setSelectedCuisine(updatedSelectedCuisine);

    const updatedAllCuisine = AllCuisine?.filter(
      (Cuisine) => Cuisine.ID !== parseInt(event.target.value)
    );
    setAllCuisine(updatedAllCuisine || []);
  };

  const handleDeleteCuisine = (CuisineID: number) => {
    const selectedCuisine = SelectedCuisine?.find(
      (Cuisine) => Cuisine.ID === CuisineID
    );
    if (!selectedCuisine) {
      setToastMessage("Failed to select cuisine!");
      setToastVisible(true);
      return;
    }

    const updatedAllCuisine = [...(AllCuisine || []), selectedCuisine];
    const updatedSelectedCuisine = SelectedCuisine?.filter(
      (Cuisine) => Cuisine.ID !== CuisineID
    );

    setAllCuisine(updatedAllCuisine);
    setSelectedCuisine(updatedSelectedCuisine || []);
    setSelectedIndex(0);
  };

  const handleSaveClick = async () => {
    const session = await getSession();
    if (!session?.user) {
      return;
    }
    const resp = await fetch(`api/user/cuisine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${session.user.accessToken}`,
      },
      body: JSON.stringify({
        excludedCuisine: SelectedCuisine,
      }),
    });
    setToastMessage(await resp.json());
    setToastVisible(true);
    if (resp.ok) {
      router.push("/profile");
    }
  };

  useEffect(() => {
    const fetchCuisne = async () => {
      const session = await getSession();
      if (session?.user) {
        const response = await fetch(`/api/user/cuisine`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${session.user.accessToken}`,
          },
        });
        if (response.ok) {
          const cuisine: user_cuisine_get_response = await response.json();
          if (cuisine) {
            setAllCuisine(cuisine.AllCuisine);
            setSelectedCuisine(cuisine.selectedCuisine);
          }
        }
      }
    };
    fetchCuisne();
  }, []);
  return (
    <>
      <div className="mt-4 w-full">
        <span className="prose">
          <h2>
            You can choose the cuisine-type you want to exclude in your meal
            preps
          </h2>
        </span>
      </div>
      <div>
        <span className="prose">
          <h3 className="mb-4 mt-4">Already excluded meal cuisine types:</h3>
        </span>

        {SelectedCuisine ? (
          <div className="grid grid-cols-5">
            {SelectedCuisine.map((cuisine) => (
              <span
                className="border bg-neutral rounded-full p-2 w-full col-span-1 text-center mb-3 border-primary"
                key={cuisine.ID.toString()}
              >
                <div className="flex items-center">
                  <span className="flex-grow">{cuisine.cuisine_type}</span>
                  <button
                    className="rounded-full ml-2 border pl-1.5 pr-1.5 flex items-center justify-center border-error"
                    onClick={() => handleDeleteCuisine(cuisine.ID)}
                  >
                    X
                  </button>
                </div>
              </span>
            ))}
          </div>
        ) : (
          <span className="prose">
            <h3 className="mb-4">No cuisine selected!</h3>
          </span>
        )}
        <span className="prose">
          <h3 className="mb-4">Exclude your Cuisine Types</h3>
        </span>

        {AllCuisine ? (
          <>
            <select
              className="select select-primary w-full max-w-xs"
              onChange={handleChange}
              value={selectedIndex}
            >
              <option key={"0"}>Select Cuisine</option>
              {AllCuisine.map((Cuisine) => (
                <option value={Cuisine.ID} key={Cuisine.ID.toString()}>
                  {Cuisine.cuisine_type}
                </option>
              ))}
            </select>
          </>
        ) : (
          <span className="prose">
            <h3>Whoops seems like there are no Cuisine to choose from!</h3>
          </span>
        )}
        <div className="flex float-right pr-9">
          <button className="btn btn-primary" onClick={() => handleSaveClick()}>
            Save Cuisine!
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

export default Cuisine;
