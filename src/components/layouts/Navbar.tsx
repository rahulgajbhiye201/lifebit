import { Link } from "react-router-dom";
import { Coffee } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="z-50 flex h-20 w-full justify-center border-b">
      <div className="flex w-1/2 flex-row items-center justify-between">
        <Link to={"/"}>
          <h1 className="text-4xl font-bold">LifeBit</h1>
        </Link>

        <a
          href="https://buymeacoffee.com/rahulgajbhiye"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex flex-col">
            <Coffee size={24} />
            <span>support me</span>
          </div>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
