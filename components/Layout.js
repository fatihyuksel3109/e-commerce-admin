import Nav from "@/components/Nav";
import { HamburgerIcon } from "@/public/icons/icons";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({ children }) {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  if (!session) {
    return (
      <div className="bg-bgGray flex items-center w-screen h-screen">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-blue-900 text-white font-semibold hover:bg-blue-700 p-3 rounded-lg px-6"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-bgGray min-h-screen">
      <div className="md:hidden flex items-center p-4 shadow-gray-900 shadow-md">
        <button onClick={() => setShowMenu(true)}>
          <HamburgerIcon />
        </button>
        <div className="flex flex-grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="bg-bgGray flex w-screen min-h-screen">
        <Nav showMenu={showMenu} closeMenu={setShowMenu} />
        <div className="flex-grow p-4 rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
