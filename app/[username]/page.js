"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function page({ params }) {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session) {
    router.push(`/login`);
  }
  return (
    <>
      <div className="cover w-full bg-red-500 relative">
        <img
          src="https://marketplace.canva.com/EAE2cQaUHVA/1/0/1600w/canva-black-minimal-motivation-quote-linkedin-banner-HoRi-2buBWk.jpg"
          className="object-cover w-full h-[350px]"
        />
        <div className="absolute -bottom-10 right-[47%]">
          <img
            className="rounded-full"
            width={85}
            height={85}
            src={session && session.user.image}
          />
        </div>
      </div>
      <div className="flex justify-center items-center my-20 text-white font-bold ">
        {session && session.user.name}
      </div>
      <div className="flex w-[100%] h-[80vh] justify-center ">
        <div className=" w-[40%] bg-purple-500 mx-12 h-[80%] text-white">
          <div className="my-10 text-center font-bold">Supporter</div>
          <div className="mx-14">
            om Donate 100 rupess With message i am from earth
          </div>
          <div className="mx-14">
            om Donate 100 rupess With message i am from earth
          </div>
          <div className="mx-14">
            om Donate 100 rupess With message i am from earth
          </div>
          <div className="mx-14">
            om Donate 100 rupess With message i am from earth
          </div>
          <div className="mx-14">
            om Donate 100 rupess With message i am from earth
          </div>
          <div className="mx-14">
            om Donate 100 rupess With message i am from earth
          </div>
        </div>
        <div className=" w-[40%] bg-purple-500 h-[80%] text-white ">
          <form className="w-[90%] m-auto">
            <div className="gap-10">
              <div className="my-4 mt-8 font-bold text-1xl">Make a Payment</div>
              <div className="my-4">
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div className="my-4">
                <input
                  type="text"
                  id="last_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Message"
                  required
                />
              </div>
              <div className="my-4">
                <input
                  type="text"
                  id="company"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Amount"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Pay
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default page;
