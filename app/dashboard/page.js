"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { fetchUser, updateUser } from '@/actions/useraction';

function Page() {
    const router =useRouter();
    const { data: session } = useSession()
    useEffect(()=>{
      if(!session) {
        router.push("/login");
    }
    },[])
    const [form,setForm]=useState({
      name:"",
      email:"",
      profile_picture:"",
      cover_picture:"",
      username:"",
      r_id:"",
      r_secret:""
    })
    useEffect(()=>{
      console.log(session)
if(session){

  getData();
}
    }
    ,[session])
    const handleSetForm=(e)=>{
      setForm({
        ...form,
        [e.target.name]:e.target.value
      })
      console.log(form)
    }
    const getData=async()=>{
      
      let u=await fetchUser(session?.user.email);
      setForm(u)
    }
    const handleSubmit=async()=>{
      let a =await updateUser(form,session.user.email);
      alert("profile update")
    }
  return (
    <div className='text-white relative top-10'>
    <div className='text-center font-bold text-2xl'> Welcome to your Dashboard</div>
    <form className='max-md:w-[50%] w-[85%] p-10 m-auto'>
    <div className="mb-2 text-white">
      <label for="base-input" className="block mb-2 text-sm font-medium text-white-900 dark:text-white">Name</label>
      <input onChange={handleSetForm} value={form.name} type="text" name='name' id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  </div>
    <div className="mb-2 text-white">
      <label for="base-input" className="block mb-2 text-sm font-medium text-white-900 dark:text-white">Email</label>
      <input onChange={handleSetForm} value={form.email} type="text" name='email' id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  </div>
    <div className="mb-2 text-white">
      <label for="base-input" className="block mb-2 text-sm font-medium text-white-900 dark:text-white">Username</label>
      <input  onChange={handleSetForm} value={form.username} type="text" name='username' id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  </div>
    <div className="mb-2 text-white">
      <label for="base-input" className="block mb-2 text-sm font-medium text-white-900 dark:text-white">Profile Picture</label>
      <input onChange={handleSetForm} value={form.profile_picture}  type="text" name='profile_picture' id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  </div>
    <div className="mb-2 text-white">
      <label for="base-input" className="block mb-2 text-sm font-medium text-white-900 dark:text-white">Cover Picture</label>
      <input onChange={handleSetForm} value={form.cover_picture}  type="text" name='cover_picture' id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  </div>
    <div className="mb-2 text-white">
      <label for="base-input" className="block mb-2 text-sm font-medium text-white-900 dark:text-white">Razorpay Id</label>
      <input onChange={handleSetForm} value={form.r_id} type="text" name='r_id' id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  </div>
    <div className="mb-2 text-white">
      <label for="base-input" className="block mb-2 text-sm font-medium text-white-900 dark:text-white">Razorpay Secret</label>
      <input onChange={handleSetForm} value={form.r_secret}  type="text" name='r_secret' id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  </div>
  <button type="button" onClick={handleSubmit} className=" mb-10 mt-5 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-full">Save</button>

    </form>
    </div>
  )
}

export default Page