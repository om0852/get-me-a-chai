"use client"
import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

function page() {
    const router =useRouter();
    const { data: session } = useSession()
    if(!session) {
        router.push(`/login`)
    }
  return (
    <div> DAshboard</div>
  )
}

export default page