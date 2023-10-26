import { StoreIcon } from "@/public/icons/icons";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex gap-2">
      <StoreIcon />
      <span>Ecommerce Admin</span>
    </Link>
  );
};

export default Logo;
