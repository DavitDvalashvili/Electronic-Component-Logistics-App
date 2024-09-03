import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-AntarcticDeep p-5 text-white">
      <nav>
        <ul className="flex justify-end space-x-10">
          <li className="px-2 py-1 text-sm xl:text-[18px] relative group">
            <Link to="/" className="relative">
              კომპონენტები
              <span className="absolute bottom-[-4px] left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-out group-hover:w-full group-hover:right-0"></span>
            </Link>
          </li>
          <li className="px-2 py-1 text-sm xl:text-[18px] relative group">
            <Link to="/devices" className="relative">
              მოწყობილობები
              <span className="absolute bottom-[-4px] left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-out group-hover:w-full group-hover:right-0"></span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
