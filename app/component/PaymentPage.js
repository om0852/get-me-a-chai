"use client"
import Script from 'next/script'
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Razorpay from 'razorpay';
import { initiate } from '@/actions/useraction';

function PaymentPage({params}) {
    const router = useRouter();
    const { data: session } = useSession();
    useEffect(()=>{
        if (!session) {
        //   router.push(`/login`);
        }

    },[])
    const [paymentform,setPaymentform]=useState({name:"",message:"",amount:""});
    const handleformdata=(e)=>{
setPaymentform({...paymentform,[e.target.name]:e.target.value});
    }
   
  const pay=async(amount)=>{
    let a= await initiate(amount,session?.user.name,paymentform);
    let orderId=a.id;

    var options = {
        "key": process.env.KEY_ID, // Enter the Key ID generated from the Dashboard
        "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Buy me Chai", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url":`${process.env.URL}/api/razorpay`,
        "handler": function (response){
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
        },
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            "name": "Gaurav Kumar", //your customer's name
            "email": "gaurav.kumar@example.com", 
            "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 =new Razorpay(options);
        rzp1.open();
  }
  return (
    <>
<Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
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
                onChange={handleformdata}
                name='name'
                  type="text"
                  value={paymentform.name}

                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div className="my-4">
                <input
                onChange={handleformdata}
                name='message'
                  type="text"
                  value={paymentform.message}
                  id="last_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Message"
                  required
                />
              </div>
              <div className="my-4">
                <input
                onChange={handleformdata}
                name='amount'
                value={paymentform.amount}

                  type="text"
                  id="company"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Amount"
                  required
                />
              </div>
            </div>
            <button
            onClick={()=>pay(paymentform.amount)}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Pay
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default PaymentPage