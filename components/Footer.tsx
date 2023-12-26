import { VscGithub } from "react-icons/vsc";
import { BiCoffeeTogo } from "react-icons/bi";
import { BsLinkedin } from "react-icons/bs";
const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-background-200 text-base-content rounded w-full mt-5">
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="https://github.com/TottySnowman/food_planer" target="_blank">
            <VscGithub className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/paul-philippe-wortmann/"
            target="_blank"
          >
            <BsLinkedin className="w-6 h-6" />
          </a>
          <a href="https://ko-fi.com/tottysnowman" target="_blank">
            <BiCoffeeTogo className="w-6 h-6" />
          </a>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          Prepify
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
