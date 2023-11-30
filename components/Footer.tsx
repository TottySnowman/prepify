import { VscGithub } from "react-icons/vsc";
import { BiCoffeeTogo } from "react-icons/bi";
import { BsLinkedin } from "react-icons/bs";
import { SiLinktree } from "react-icons/si";
const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-background-200 text-base-content rounded w-full mt-5">
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">About me</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Feedback</a>
      </nav>
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
          <a href="https://linktr.ee/paul_wortmann" target="_blank">
            <SiLinktree className="w-6 h-6" />
          </a>
          <a href="https://ko-fi.com/tottysnowman" target="_blank">
            <BiCoffeeTogo className="w-6 h-6" />
          </a>
        </div>
      </nav>
      <aside>
        <p>Copyright © 2023 - All right reserved by Prepify</p>
      </aside>
    </footer>
  );
};

export default Footer;