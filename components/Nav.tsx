"use client";
import Link from "next/link";
import Image from "next/image";
import LoginPanel from "./LoginPanel";
import { FaTimes, FaBars } from "react-icons/fa";
import {
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
} from "next-auth/react";
import { useEffect, useState, useRef } from "react";
const Nav = () => {
  const { data: session } = useSession();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const loginDialog = useRef<HTMLDialogElement | null>(null);
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
  function openLoginPanel() {
    if (loginDialog.current) {
      const login = loginDialog.current;
      login.showModal();
    }
  }
  return (
    <>
      <nav className="navbar mb-16 pt-3 min-h-fit">
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
        <div className="hidden md:block navbar-center">
          <div className="flex space-x-4">
            <Link href="/weekly_recipe">
              <p>Weekly Recipe</p>
            </Link>
            <Link href="/step_by_step">
              <p>Guide</p>
            </Link>
            <Link href="/notion_setup">
              <p>Setup Notion</p>
            </Link>
          </div>
        </div>

        <div className="-mr2 flex md:hidden">
          <button
            type="button"
            onClick={() => setOpenMenu(!openMenu)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            {openMenu === true ? <FaTimes /> : <FaBars />}
          </button>

          {openMenu ? (
            <div className="md:hidden">
              <div className="ox-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/weekly_recipe">
                  <p>Weekly Recipe</p>
                </Link>
                <Link href="/step_by_step">
                  <p>Guide</p>
                </Link>
                <Link href="/notion_setup">
                  <p>Setup Notion</p>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
        <div className="navbar-end sm:flex hidden p-5">
          {session?.user ? (
            <div className="dropdown dropdown-hover">
              <Link href="/profile">
                <div className="flex gap-3 md:gap-5">
                  {session?.user.username}
                  <Image
                    src={session?.user.image as string}
                    width={40}
                    height={40}
                    alt="ProfilePicture"
                    className="rounded-full"
                  />
                </div>
              </Link>
              <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link href="/profile">Your Profile</Link>
                </li>
                <li>
                  <button className="" onClick={() => signOut()}>
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              {provider ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => openLoginPanel()}
                >
                  Sign in now!
                </button>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      </nav>
      <dialog id="login_dialog" ref={loginDialog} className="modal">
        <LoginPanel />
      </dialog>
    </>
  );
};

export default Nav;
