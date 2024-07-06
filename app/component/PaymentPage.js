"use client"
import Script from 'next/script'
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { initiate } from '@/actions/useraction';

function PaymentPage({ params }) {
  const router = useRouter();
  const { data: session } = useSession();
  
  useEffect(() => {
    if (!session) {
      router.push(`/login`);
    }
  }, [session, router]);
  
  const [paymentForm, setPaymentForm] = useState({ name: "", message: "", amount: "" });
  
  const handleFormData = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  }
  
  const pay = async (amount) => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      let response = await initiate(amount, params.username, paymentForm);
      let orderId = response.id;
  
      var options = {
        "key": process.env.KEY_ID, // Ensure this environment variable is set
        "amount": amount * 100, // Amount should be in the smallest currency unit (paise for INR)
        "currency": "INR",
        "name": "GET ME A TEA",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": orderId,
        "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
        "prefill": {
          "name": paymentForm.name || "Anonymous",
          "email": session?.user?.email || "anonymous@example.com",
          "contact": "8390471333"
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#3399cc"
        }
      };
  
      var rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Error initiating payment');
    }
  }
  
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="cover w-full bg-red-500 relative">
        <img
          src="https://marketplace.canva.com/EAE2cQaUHVA/1/0/1600w/canva-black-minimal-motivation-quote-linkedin-banner-HoRi-2buBWk.jpg"
          className="object-cover w-full h-[350px]"
          alt="Cover"
        />
        <div className="absolute -bottom-10 right-[47%]">
          <img
            className="rounded-full"
            width={85}
            height={85}
            src={session && session.user.image}
            alt="User"
          />
        </div>
      </div>
      <div className="flex justify-center items-center my-20 text-white font-bold ">
        {session && session.user.name}
      </div>
      <div className="flex w-[100%] h-[80vh] justify-center ">
        <div className="w-[40%] bg-purple-500 mx-12 h-[80%] text-white">
          <div className="my-10 text-center font-bold">Supporter</div>
          <div className="mx-14">om Donate 100 rupess With message I am from earth</div>
          <div className="mx-14">om Donate 100 rupess With message I am from earth</div>
          <div className="mx-14">om Donate 100 rupess With message I am from earth</div>
          <div className="mx-14">om Donate 100 rupess With message I am from earth</div>
          <div className="mx-14">om Donate 100 rupess With message I am from earth</div>
          <div className="mx-14">om Donate 100 rupess With message I am from earth</div>
        </div>
        <div className="w-[40%] bg-purple-500 h-[80%] text-white">
          <div className="w-[90%] m-auto">
            <div className="gap-10">
              <div className="my-4 mt-8 font-bold text-1xl">Make a Payment</div>
              <div className="my-4">
                <input
                  onChange={handleFormData}
                  name='name'
                  type="text"
                  value={paymentForm.name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div className="my-4">
                <input
                  onChange={handleFormData}
                  name='message'
                  type="text"
                  value={paymentForm.message}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Message"
                  required
                />
              </div>
              <div className="my-4">
                <input
                  onChange={handleFormData}
                  name='amount'
                  value={paymentForm.amount}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Amount"
                  required
                />
              </div>
            </div>
            <button
              onClick={() => pay(paymentForm.amount)}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentPage;
