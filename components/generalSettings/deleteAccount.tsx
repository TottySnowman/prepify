"use client";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { signOut } from "next-auth/react";

const DeleteAccount = () => {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const handleButtonClick = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleDelete = async () => {
    const session = await getSession();
    if (!session?.user) {
      return;
    }

    const resp = await fetch(`api/user/general`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${session.user.accessToken}`,
      },
    });
    signOut();
    if (resp.ok) {
      router.push("/");
    }
  };

  return (
    <>
      <div className="pr-10">
        <button className="btn btn-error" onClick={handleButtonClick}>
          Delete Account
        </button>
        <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete account</h3>
            <p className="py-4">
              Are you sure you want to delete your account?
            </p>
            <div className="modal-action">
              <form method="dialog" className="flex justify-center space-x-4">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-success">Cancel</button>
                <button className="btn btn-error" onClick={handleDelete}>
                  Yes
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default DeleteAccount;
