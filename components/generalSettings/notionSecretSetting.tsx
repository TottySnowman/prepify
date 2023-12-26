"use client";
import { ChangeEvent } from "react";
import { notionSecretSettingImport } from "@/app/global_types/general";
const NotionSecretSetting = (notionSecretImport: notionSecretSettingImport) => {
  const changeNotionSecret = (event: ChangeEvent<HTMLInputElement>) => {
    notionSecretImport.setNotionSecret(event.target.value);
  };

  return (
    <div className="flex flex-col mb-4 border-2 border-primary rounded-md p-2 bg-background-100">
      <p className="mb-4 text-center">Change or set your Notion secret:</p>
      <input
        type="text"
        className="text-center input input-bordered input-secondary mb-2"
        value={
          notionSecretImport.notionSecret ? notionSecretImport.notionSecret : ""
        }
        onChange={changeNotionSecret}
      ></input>
    </div>
  );
};
export default NotionSecretSetting;
