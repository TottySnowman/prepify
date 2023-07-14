"use client";

export default function Home() {
  async function handleUserClick() {
    const userID: number[] = [5, 9];
    const body = {
      sentUserID: userID,
    };
    const response = await fetch("api/meal", {
      method: "POST",
      body: JSON.stringify(body),
    });
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
