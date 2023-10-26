import {
  CategoryIcon,
  CloseIcon,
  HomeIcon,
  LogOutIcon,
  OrderIcon,
  ProductIcon,
  SettingsIcon,
  StoreIcon,
} from "@/public/icons/icons";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Logo from "./Logo";

function Nav({ showMenu, closeMenu }) {
  const inActiveLink = "flex gap-2 p-1";
  const activeLink =
    inActiveLink +
    " bg-highlight text-black text-primary font-semibold rounded-md pl-0";

  const router = useRouter();
  const { pathname } = router;
  async function logout() {
    await router.push("/");
    await signOut();
  }

  return (
    <aside
      className={
        (showMenu ? "left-0" : "-left-full") +
        " top-0 text-gray-500 p-4 fixed w-full bg-bgGray h-full md:static md:w-auto transition-all"
      }
    >
      <div className=" mb-4 mr-4 flex justify-between">
        <Logo />
        <div onClick={() => closeMenu(false)} className="sm:hidden">
          <CloseIcon />
        </div>
      </div>
      <nav className="flex flex-col gap-4">
        <Link className={pathname === "/" ? activeLink : inActiveLink} href="/">
          <HomeIcon />
          Dashboard
        </Link>
        <Link
          className={pathname.includes("/products") ? activeLink : inActiveLink}
          href="/products"
        >
          <ProductIcon />
          Products
        </Link>
        <Link
          className={
            pathname.includes("/categories") ? activeLink : inActiveLink
          }
          href="/categories"
        >
          <CategoryIcon />
          Categories
        </Link>
        <Link
          className={pathname.includes("/orders") ? activeLink : inActiveLink}
          href="/orders"
        >
          <OrderIcon />
          Orders
        </Link>
        <Link
          className={pathname.includes("/settings") ? activeLink : inActiveLink}
          href="/settings"
        >
          <SettingsIcon />
          Settings
        </Link>
        <button onClick={logout} className={inActiveLink}>
          <LogOutIcon />
          Log Out
        </button>
      </nav>
    </aside>
  );
}

export default Nav;
