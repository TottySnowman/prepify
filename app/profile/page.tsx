"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Profile_Settings from "@/components/Profile_Settings";
type tabs = {
  [AllergyTab: string]: boolean;
};

const Profile = () => {
  const { data: session } = useSession();
  const [TabVisibility, setTabVisibility] = useState<tabs>({
    AllergyTab: false,
    CuisineTab: false,
    DietTab: false,
    GeneralTab: false,
  });

  const setTabVisible = (tabname: string) => {
    console.log(TabVisibility);
    setTabVisibility((prevState) => {
      const updatedVisibility: tabs = {};
      for (const key in prevState) {
        updatedVisibility[key] = key === tabname ? !prevState[key] : false;
      }
      return updatedVisibility;
    });
  };

  useEffect(() => {
    setTabVisible("AllergyTab");
  }, []);
  return (
    <div className="flex-grow">
      {session?.user ? (
        <div className="grid grid-cols-5 justify-center">
          <div className="col-span-1 prose flex flex-col mt-0">
            <div className="ml-10">
              <Image
                src={session?.user?.image as string}
                alt="Profilepicture"
                width={200}
                height={200}
                className="rounded-full"
              ></Image>
              <h3 className="mt-0">
                {session?.user?.username} personal profile!
              </h3>
            </div>
          </div>
          <Profile_Settings />
        </div>
      ) : (
        <h1>Whoops seems like you are not logged in!</h1>
      )}
    </div>
  );
};

export default Profile;
