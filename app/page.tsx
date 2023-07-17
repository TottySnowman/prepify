"use client";

export default function Home() {
  async function handleUserClick() {
    const response = await fetch("api/meal", {
      method: "GET",
    });
    if (response.ok) {
      console.log(await response.json());
    }
  }
  return (
    <div className="">
      <h1 className="prose">Welcome to the food planer</h1>
      <button className="btn btn-primary" onClick={() => handleUserClick()}>
        Testing
      </button>
    </div>
  );
}
