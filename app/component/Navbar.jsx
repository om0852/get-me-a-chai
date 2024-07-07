"use client"
import "@/app/globals.css"
import React, { useEffect, useState } from "react";
import teaLogo from "@/app/images/tea-logo.png"
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { fetchUser } from "@/actions/useraction";
const Navbar = () => {
  const [userData,setUserData]=useState(null)
    const [showDropDown,setShowDropDown]=useState(false)
    useEffect(()=>{
console.log(showDropDown)
    },[showDropDown])
    const router =useRouter();
    const { data: session } = useSession()
    if(session) {
        // router.push(`/${session.user.name}`)
    }
    const handleuserdata=async()=>{
      if(session) {

      const d = await fetchUser(session.user.email);
      setUserData(d)
    }
  }
    useEffect(()=>{
      handleuserdata();
    },[session])
  return (
    <nav  className=" bg-black navbar text-white flex justify-between px-6 h-16 items-center background:radial-gradient(125%_125%_at_50%_10%,#00f_40%,#63t_100%)">
      <Link href={"/"} className="logo font-bold text-lg flex"><span className="mx-6"><img src={teaLogo.src} width={33}/></span>GetMeaChai</Link>
      {/* <ul className="flex justify-between gap-4">
        <li>Home</li>
        <li>About</li>
        <li>Projects</li>
        <li>Sign Ups</li>
        <li>Login</li>
      </ul> */}
{     !session && <Link href={"/login"}>
      <button  type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
      </Link>
}{         session && 
<div >
<button onClick={()=>setShowDropDown(true)} id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  " style={{overflow:"hidden"}} type="button">{userData?.username} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

<div onBlur={()=>setShowDropDown(false)}   id="dropdownInformation" style={{display:showDropDown?"block":"none"}} className="z-10 right-4 top-16 absolute hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
      <div>{userData?.username}</div>
      <div className="font-medium truncate">{session.user.email}</div>
    </div>
    <ul  className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
      <li>
        <Link href="/dashboard"  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
      </li>
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
      </li>
      <li>
        <Link href={`${userData?.username}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
      </li>
    </ul>
    <div className="py-2">
      <button  onClick={() => {signOut() ;router.push("/login")}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
    </div>
</div>

</div>
}
    </nav>
  );
};

export default Navbar;
