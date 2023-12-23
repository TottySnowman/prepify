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
      alert("Cuisine not found!");
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
      alert("Cuisine not found!");
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
      <div className="text-center">
        <h2>Here you can choose the different Cuisinetypes</h2>
        <br />
        <h3>
          You can choose the cuisine-type you want to exclude in your meal preps
        </h3>
      </div>
      <div>
        <h3>Already excluded meal cuisine types:</h3>
        {SelectedCuisine ? (
          <div className="grid grid-cols-5">
            {SelectedCuisine.map((cuisine) => (
              <span
                className="border bg-neutral rounded-full p-2 w-1/2 col-span-1 text-center mb-3"
                key={cuisine.ID.toString()}
              >
                {cuisine.cuisine_type}
                <button
                  className="rounded-full ml-4 border-neutral"
                  onClick={() => handleDeleteCuisine(cuisine.ID)}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        ) : (
          <h4>Non selected!</h4>
        )}
        <h3 className="mb-4">Exclude your Cuisine Types</h3>
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
          <h4>Whoops seems like there are no Cuisine to choose from!</h4>
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
