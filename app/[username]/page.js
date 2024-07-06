"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import PaymentPage from "../component/PaymentPage";

function page({ params }) {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session) {
    // router.push(`/login`);
  }
  // const [paymentform,setPaymentform]
  return (
    <>
    <PaymentPage params={params}/>
    </>
  );
}

export default page;
