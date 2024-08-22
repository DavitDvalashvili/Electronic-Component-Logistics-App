import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-AntarcticDeep p-5 text-white">
      <nav>
        <ul className="flex space-x-10">
          <li className="px-2 py-1 bg-SheetMetal rounded-md text-sm xl:text-lg">
            <Link to="/">მთავარი გვერდი</Link>
          </li>
          <li className="px-2 py-1 bg-SheetMetal rounded-md text-sm xl:text-lg">
            <Link to="/devices">მოწყობილობები</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
