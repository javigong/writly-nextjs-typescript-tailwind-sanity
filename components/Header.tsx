import Image from "next/image";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <div>
            <Image
              className="w-44 object-contain cursor-pointer"
              src="/writly-logo-bg-white.svg"
              width={250}
              height={250}
              alt="Writly"
            />
          </div>
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="text-white bg-[royalblue] px-4 py-1 rounded-full">
            Follow
          </h3>
        </div>
      </div>

      <div className="flex items-center space-x-5 text-[royalblue]">
        <h3>Sign In</h3>
        <h3 className="border rounded-full px-4 py-1 border-[royalblue]">
          Get Started
        </h3>
      </div>
    </header>
  );
};

export default Header;
