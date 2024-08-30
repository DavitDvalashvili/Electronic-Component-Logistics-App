import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-AntarcticDeep p-5 text-white">
      <nav>
        <ul className="flex space-x-10">
          <li className="px-2 py-1   text-sm xl:text-md">
            <Link to="/">მთავარი გვერდი</Link>
          </li>
          <li className="px-2 py-1   text-sm xl:text-md">
            <Link to="/devices">მოწყობილობები</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
