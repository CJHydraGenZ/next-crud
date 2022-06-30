import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <nav>
      <Link href={`/register`}>
        <a>Register</a>
      </Link>
      <Link href={`/login`}>
        <a>Login</a>
      </Link>
    </nav>
  );
};
