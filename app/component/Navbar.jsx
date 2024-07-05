import React from "react";
import teaLogo from "@/app/images/tea-logo.png"
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="bg-black text-white flex justify-between px-6 h-16 items-center background:radial-gradient(125%_125%_at_50%_10%,#00f_40%,#63t_100%)">
      <div className="logo font-bold text-lg flex"><span className="mx-6"><img src={teaLogo.src} width={33}/></span>GetMeaChai</div>
      {/* <ul className="flex justify-between gap-4">
        <li>Home</li>
        <li>About</li>
        <li>Projects</li>
        <li>Sign Ups</li>
        <li>Login</li>
      </ul> */}
      <Link href={"/login"} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</Link>

    </nav>
  );
};

export default Navbar;
