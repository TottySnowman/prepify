"use client";

import { getSession } from "next-auth/react";
export default function Home() {
  return (
    <div className="">
      <h1 className="prose">Welcome to Prepify!</h1>
      <button className="btn btn-primary">Testing</button>
    </div>
  );
}
