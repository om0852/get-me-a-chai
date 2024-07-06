const { default: connectDB } = require("@/app/db/db");
const { default: Payment } = require("@/app/models/payment");
const { NextResponse } = require("next/server");
const Razorpay = require("razorpay");
const { validatePaymentVerification } = require("razorpay/dist/utils/razorpay-utils");


export const POST = async(req)=>{
    await connectDB()
    let body= await req.formData();
    body=Object.fromEntries(body);
    //check if razorpay order is present is on the server
    let p= Payment.findOne({oid:body.razorpay_order_id})
    if(!p){
        return NextResponse.json({message:`Order Id not found`})
    }
    let x=  validatePaymentVerification({"order_id":body.razorpay_order_id,"payment_id":body.razorpay_payment_id},body.razorpay_signature,process.env.RKEY_SECRET)
    if(x){
      const data=  await Payment.findOneAndUpdate({oid:body.razorpay_order_id},{done:true},{new:true})
      console.log(data)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${data.to_user}?payment=true`)

    }
    else{
        return NextResponse.json({message:`Payment Verification Failed`})

    }
}