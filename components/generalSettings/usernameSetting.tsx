"use client";
import { ChangeEvent } from "react";
import { usernameSettingImport } from "@/app/global_types/general";

const UsernameSettings = (usernameImport: usernameSettingImport) => {
  const changeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    usernameImport.setUsername(event.target.value);
  };
  return (
    <div className="flex flex-col mb-4 border-2 border-primary rounded-md p-2 bg-background-100">
      <div className="mb-4 text-center">
        <p>Set your username:</p>
      </div>
      <input
        type="text"
        name="username"
        value={usernameImport.username ? usernameImport.username : ""}
        onChange={changeUsername}
        className="text-center input input-bordered input-primary mb-2"
      />
    </div>
  );
};

export default UsernameSettings;
