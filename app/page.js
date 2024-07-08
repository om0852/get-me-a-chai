"use client"
import Image from "next/image";
import teaLogo from "@/app/images/tea-logo.png"
import coinImg from "@/app/images/coin-img.jpg"
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"

import { fetchUser } from "@/actions/useraction";
import Head from "next/head";
import { useRouter } from "next/navigation";
export default function Home() {
  const { data: session } = useSession()
const router=useRouter()
  const [userData,setUserData]=useState(null)
  const getData=async()=>{
      
    let u=await fetchUser(session?.user.email);
    setUserData(u)
  }
  useEffect(()=>{
    if(!session){
router.push("login")
    }
getData();

  },[])
  return (
    <>
      <Head>
        <title>welcome</title>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</Head>
  <div className="flex justify-center flex-col text-white h-[44vh] items-center gap-4 ">
   <div className="font-bold text-3xl flex justify-center align-center">Buy Me a Chai<span className="mx-2"><img src={teaLogo.src} width={44}/></span></div>
   <div>

<p className="w-[70%] m-auto text-center">
  A crowd funding platform ajkghdu akshfkah akjhdka
 </p>
 </div>
   <div className="">
   <Link href={`/${userData?.username}`} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Start Here</Link>
   <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Read More</button>

   </div>
  </div>
   <div className="bg-white h-1 opacity-10 mb-14">
   </div>
   <div className="text-white container mx-auto">
    <h1 className="text-center my-5 font-bold text-2xl" >
Yours Fans can buy a Chai
    </h1>
    <div className="max-md:flex gap-10 justify-around align-center items-center sm:text-left grid">
      <div className="item space-y-3" style={{display:"grid",placeItems:"center"}}><div className="mx-auto"><img className="mx-auto mb-2" src={teaLogo.src} width={44}/></div>Fans want to help you<p className="mt-2">Your fans are available to help you</p></div>
      <div className="item space-y-3" style={{display:"grid",placeItems:"center"}}><div className=""><img className="mx-auto mb-2" src={coinImg.src} width={44}/></div>Fund Yourself <p className="mt-2">Your fans are available to help you</p></div>
      <div className="item space-y-3" style={{display:"grid",placeItems:"center"}}><div className=""><img className="mx-auto mb-2" src={teaLogo.src} width={44}/></div>Fans want to help you <p className="mt-2">Your fans are available to help you</p></div>
     </div>
   </div>
   <div className="bg-white h-1 opacity-10 my-14">
   </div>
   <div className="text-white container mx-auto">
    <h1 className="text-center sm:text-left my-5 font-bold text-2xl" >
Learn More About Us
    </h1>
    <div className=" gap-10 max-md:flex justify-around align-center items-center grid">
      <div className="item space-y-3" style={{display:"grid",placeItems:"center"}}><div className="mx-auto"><img className="mx-auto mb-2" src={teaLogo.src} width={44}/></div>Fans want to help you<p className="mt-2">Your fans are available to help you</p></div>
      <div className="item space-y-3" style={{display:"grid",placeItems:"center"}}><div className=""><img className="mx-auto mb-2" src={coinImg.src} width={44}/></div>Fund Yourself <p className="mt-2">Your fans are available to help you</p></div>
      <div className="item space-y-3" style={{display:"grid",placeItems:"center"}}><div className=""><img className="mx-auto mb-2" src={teaLogo.src} width={44}/></div>Fans want to help you <p className="mt-2">Your fans are available to help you</p></div>
     </div>
   </div>
    </>
  );
}
