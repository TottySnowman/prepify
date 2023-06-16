import { signIn } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";
const LoginPanel = () => {
  return (
    <>
      <form method="dialog" className="modal-box">
        <div className="mb-4">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h1 className="text-center font-bold text-lg">Login</h1>
        </div>
        <div className="grid grid-cols-2 gap-4 justify-items-center">
          <div className="col-span-1 text-center">
            <button
              className="flex flex-col items-center justify-center"
              onClick={async () => await signIn("github")}
            >
              <BsGithub className="mb-2" />
              <span>Sign in with Github</span>
            </button>
          </div>
          <div className="col-span-1 text-center">
            <button
              className="flex flex-col items-center justify-center"
              onClick={async () => await signIn("google")}
            >
              <BsGoogle className="mb-2" />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>Close</button>
      </form>
    </>
  );
};
export default LoginPanel;
