"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import Allergy from "@/components/Allergy";

const Profile = () => {
  const { data: session } = useSession();

  return (
    <>
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
          <div className="col-span-4">
            <div className="col-span-1">
              <Allergy />
            </div>
          </div>
        </div>
      ) : (
        <h1>Whoops seems like you are not logged in!</h1>
      )}
    </>
  );
};

export default Profile;
