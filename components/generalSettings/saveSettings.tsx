"use client";
import { userSettings } from "@/app/global_types/general";
import { getSession } from "next-auth/react";
import Toast from "@/components/Toast";
import { useState } from "react";

const SaveSettings = (updatedUserSettings: userSettings) => {
  const [ToastMessage, setToastMessage] = useState<string>("");
  const [ToastVisible, setToastVisible] = useState<boolean>(false);
  const [ToastMessageType, setToastMessageType] = useState<string>("");

  const saveSettingsClick = async () => {
    const session = await getSession();
    if (!session?.user) {
      return;
    }

    const resp = await fetch(`api/user/general`, {
      method: "POST",
      body: JSON.stringify({
        username: updatedUserSettings.username,
        notionSecret: updatedUserSettings.notionSecret,
        portion: updatedUserSettings.portion,
        selectedMealType: updatedUserSettings.selectedMealType,
        measure: updatedUserSettings.measure,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${session.user.accessToken}`,
      },
    });
    setToastMessage(await resp.json());
    setToastVisible(true);
    setToastMessageType(resp.ok ? "success" : "error");

    if (resp.ok) {
      window.location.reload();
    }
  };
  return (
    <>
      <div className="pr-5">
        <button className="btn btn-success" onClick={saveSettingsClick}>
          Save Settings!
        </button>
      </div>
      <Toast
        toastMessage={ToastMessage}
        visible={ToastVisible}
        ParentVisible={setToastVisible}
        messageType={ToastMessageType}
      />
    </>
  );
};

export default SaveSettings;
