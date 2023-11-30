"use client";
import Link from "next/link";
import Image from "next/image";
import LoginPanel from "./LoginPanel";
import { FaTimes, FaBars, FaHamburger } from "react-icons/fa";
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
  const menuRef = useRef<HTMLDivElement>(null);

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

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    }

    // Attach the event listener
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
  function openLoginPanel() {
    if (loginDialog.current) {
      loginDialog.current.showModal();
    }
  }
  return (
    <>
      {/* <nav className="md:navbar md:mb-16 md:pt-3 md:min-h-fit">
        <div className="md:navbar-start">
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
                <Link
                  href="/weekly_recipe"
                  className="block px-3 py-2 rounded-md text-base font-medium"
                >
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
      </nav> */}

      {/* <div className="bg-grey-800">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
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
          </div>
        </div>
      </div> */}

      <nav className="navbar bg-base-100">
        <div className="flex-1">
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
        <div className="sm:hidden md:flex-none md:block md:mb-16 md:pt-3">
          <div className="flex space-x-4 items-center">
            <Link href="/weekly_recipe">
              <p>Weekly Recipe</p>
            </Link>
            <Link href="/step_by_step">
              <p>Guide</p>
            </Link>
            <Link href="/notion_setup">
              <p>Setup Notion</p>
            </Link>
            {session?.user ? (
              <div className="dropdown dropdown-hover z-10 pl-5">
                <Link href="/profile">
                  <div className="flex sm:gap-3 items-center">
                    <Image
                      src={session?.user.image as string}
                      width={40}
                      height={40}
                      alt="ProfilePicture"
                      className="rounded-full"
                    />
                    <p>{session.user.username}</p>
                  </div>
                </Link>
                <ul className="dropdown-content menu shadow bg-base-100 rounded-box w-40">
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
                ) : null}
              </div>
            )}
          </div>
        </div>
        <div className="dropdown dropdown-end" ref={menuRef}>
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setOpenMenu(!openMenu)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {openMenu === true ? (
                <FaTimes className="text-1xl" />
              ) : (
                <FaHamburger className="text-2xl" />
              )}
            </button>
          </div>
          {openMenu ? (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/weekly_recipe">
                  <p>Weekly Recipe</p>
                </Link>
              </li>
              <li>
                <Link href="/step_by_step">
                  <p>Guide</p>
                </Link>
              </li>
              <li className="mb-5">
                <Link href="/notion_setup">
                  <p>Setup Notion</p>
                </Link>
              </li>

              {session?.user ? (
                <>
                  <li>
                    <Link href="/profile">
                      <div className="justify-between">
                        <p>Your Profile</p>
                        <Image
                          src={session?.user.image as string}
                          width={40}
                          height={40}
                          alt="ProfilePicture"
                          className="rounded-full"
                        />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <button className="" onClick={() => signOut()}>
                      Log out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    {provider ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => openLoginPanel()}
                      >
                        Sign in now!
                      </button>
                    ) : null}
                  </li>
                </>
              )}
            </ul>
          ) : null}
        </div>
      </nav>

      <dialog id="login_dialog" ref={loginDialog} className="modal">
        <LoginPanel />
      </dialog>
    </>
  );
};

export default Nav;
