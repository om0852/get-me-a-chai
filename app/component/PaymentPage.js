"use client"
import Script from 'next/script'
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchpayments,fetchUser, initiate } from '@/actions/useraction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
function PaymentPage({ params }) {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams=useSearchParams();
  useEffect(() => {
    if (!session) {
      router.push(`/login`);
    }
  }, [session, router]);
  useEffect(()=>{
if(searchParams.get("payment")){
  toast.success("Payment Has Done!", {
    position: "top-center",
    autoClose:2000,
    theme:"light"
  });
}
  },[])
  const [paymentForm, setPaymentForm] = useState({ name: "", message: "", amount: 1 });
  const [buttonDisable,setButtonDisable]=useState(false);
  const [currentUser,setCurrentUser]=useState({});
  const [payments,setPayments]=useState([])
  const handleFormData = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  }
  const getData=async(username)=>{
    let u =await fetchUser(session?.user.email)
    console.log(u)
    setCurrentUser(u);
    let d= await fetchpayments(username);
    setPayments(d)
  }
  useEffect(()=>{

    if(paymentForm.name!="" && paymentForm.message!="" && (paymentForm.amount>0 && paymentForm.amount<10000)){
      setButtonDisable(true)
        }
        else{
          setButtonDisable(false)
        }
      
  },[paymentForm])
useEffect(()=>{
  getData(params.username)
},[])
  const pay = async (amount) => {
    if (!amount || isNaN(amount) || amount <= 1) {
      alert('Please enter a valid amount or amount greater than 0');
      return;
    }
    if((paymentForm.amount>0 && paymentForm.amount<10000)){
// alert("amount must be greater than ")
    }

    try {
      let response = await initiate(amount, params.username, paymentForm,session.user.email);
      let orderId = response.id;
      var options = {
        "key": currentUser.r_id, // Ensure this environment variable is set
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
      <ToastContainer />

        <img
          src="https://marketplace.canva.com/EAE2cQaUHVA/1/0/1600w/canva-black-minimal-motivation-quote-linkedin-banner-HoRi-2buBWk.jpg"
          className="w-full max-md:h-[350px] h-[220px]"
          alt="Cover"
        />
        <div className="absolute max-md:-bottom-25 max-md:right-[50%] text-white gap-3 w-[40vh] -bottom-[15vh] left-[8%]" style={{display:"grid",placeItems:"center",bottom:"-20vh",left:"40%"}}>
          <img
            className="rounded-full"
            width={85}
            height={85}
            src={session && session.user.image}
            alt="User"
          />
          <div className='my-1'>
               
                  {session && session.user.name}
          </div>
          <div className='my-1'>
{payments.length} has raised rupess{payments.reduce((a,b)=>a+Number.parseInt(b.amount),0)}               
          </div>

        </div>
      </div>
      <div className="flex justify-center items-center my-20 text-white font-bold ">
      </div>
      <div className="max-md:flex grid w-[100%] h-[80vh] justify-center place-items-center	 ">
        <div className="max-md:w-[40%] w-[80%] bg-purple-500 mx-12 h-[80%] text-white" style={{overflowY:"scroll",scrollbarWidth:"none"}}>
          <div className="my-10 text-center font-bold">Supporter</div>
          {payments.length==0 && "No Payment Found"}
          {payments && payments.map((data,index)=>{
return(
  <div key={index} className="mx-14">{data.name} Donate {data.amount} rupess With message {data.message} </div>
) 
          })}
        </div>
        <div className="max-md:w-[40%] w-[80%] bg-purple-500 h-[80%] text-white">
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
            <button disabled={!buttonDisable}
              onClick={() => pay(Number.parseInt(paymentForm.amount)*100)}
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
