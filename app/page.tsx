"use client";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";
export default function Home() {
  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      console.log(response);
    };

    fetchProviders();
  }, []);
  const { data: session } = useSession();
  return (
    <div>
      <h1>Welcome to the food planer</h1>
      <button type="button" key={"Github"} onClick={() => signIn("github")}>
        Sign in
      </button>
      <div>
        {session?.user ? (
          <Image
            src={session?.user.image as string}
            alt="Profile pic"
            width={38}
            height={38}
          />
        ) : (
          "Not logged in"
        )}
      </div>
    </div>
  );
}
