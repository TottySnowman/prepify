"use client";
import Image from "next/image";
import About from "@/components/about";
import JoinNow from "@/components/JoinNow";
export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center h-fit mt-10 z-0">
        <div className="flex items-center border border-solid border-gray-300 rounded-sm p-5 animate__animated animate__fadeInLeft animate__slower bg-base-100">
          <div className="sm:text-xl md:text-4xl text-grey-800 transform translate-x-full animate__animated animate__fadeInLeft animate__slower">
            <p className="mb-5">Simplify your meal Prep with Prepify!</p>
            <p>Healthy and Delicious meals made easy!</p>
          </div>
          <div className="ml-4 md:h-96 md:w-96 transform translate-x-full animate__animated animate__fadeInLeft animate__slower rounded-lg">
            <Image
              src="/assets/images/prepify_landing_page.jpeg"
              alt="Prepify Home"
              width={300}
              height={300}
              className="w-full max-w-md md:max-w-full rounded-lg"
            ></Image>
          </div>
        </div>
      </div>
      <About />
      <JoinNow />
    </>
  );
}
