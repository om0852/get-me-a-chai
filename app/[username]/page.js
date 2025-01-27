"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { notFound, useRouter } from "next/navigation";
import PaymentPage from "../component/PaymentPage";
import { fetchUserByName } from "@/actions/useraction";
import { Elsie_Swash_Caps } from "next/font/google";
import Loader from "../component/Loader";

function Page({ params }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [state,setState]=useState(true);

  const [loaderState,setLoaderState]=useState(false);
  const checkuser=async()=>{
      const d= await fetchUserByName(params.username)
      if(!d){

      }
setState(d)
setLoaderState(false)
  }
useEffect(()=>{
  checkuser();
},[])
  return (
    <>
  
          {loaderState&& <Loader/>}

{  state==true?  <PaymentPage params={params}/>:<div className="flex justify-center items-center w-[100%] h-[80vh]"><h1 className="text-white">User Not Found</h1></div>

}    </>
  );
}

export default Page;
