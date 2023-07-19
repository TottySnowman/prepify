"use client";

import { getSession } from "next-auth/react";

export default function Home() {
  async function handleUserClick() {
    const session = await getSession();
    if (session?.user) {
      const response = await fetch(`/api/user/${session.user.id}/meal`);
      if (response.ok) {
        console.log(await response.json());
      }
    }
  }
  return (
    <div className="">
      <h1 className="prose">Welcome to Prepify!</h1>
      <button className="btn btn-primary" onClick={() => handleUserClick()}>
        Testing
      </button>
    </div>
  );
}
