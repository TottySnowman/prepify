"use client";
import Link from "next/link";
import Image from "next/image";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
} from "next-auth/react";
import { useEffect, useState } from "react";
const Nav = () => {
  const { data: session } = useSession();
  const [provider, setProvider] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);
  useEffect(() => {
    const fetchProviders = async () => {
      const fetchedProviders = await getProviders();
      setProvider(fetchedProviders);
    };
    fetchProviders();
  });

  return (
    <nav className="navbar mb-16 pt-3">
      <div className="navbar-start">
        <Link href="/" className="flex gap-2 flex-center items-center">
          <Image
            src="/assets/images/Prepify_logo.png"
            alt="Prepify Logo"
            width={50}
            height={50}
          />
          <p>Prepify</p>
        </Link>
      </div>
      <div className="navbar-center">
        
      </div>
      <div className="navbar-end sm:flex hidden p-5">
        {session?.user ? (
          <div className="dropdown dropdown-hover">
            <Link href="/profile">
              <div className="flex gap-3 md:gap-5">
                {session?.user.username}
                <Image
                  src={session?.user.image as string}
                  width={30}
                  height={30}
                  alt="ProfilePicture"
                />
              </div>
            </Link>
            <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link href="/profile">Your Profile</Link>
              </li>
              <li>
                <button className="btn btn-secondary" onClick={() => signOut()}>
                  Log out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            {provider ? (
              <button type="button" className="btn btn-primary">
                Sign in now!
              </button>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
