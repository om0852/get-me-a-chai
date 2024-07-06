"use server"


import connectDB from "@/app/db/db"
import Payment from "@/app/models/payment"
import User from "@/app/models/user"
import Razorpay from "razorpay"


export const initiate =async (amount,to_username,paymentform)=>{
    await connectDB()
    var instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET })

instance.orders.create({
amount: 50000,
currency: "INR",
receipt: "receipt#1",
notes: {
    key1: "value3",
    key2: "value2"
}
})
let options={
    amount:Number.parseInt(amount),
    currency:"INR"
}
let x =await instance.orders.create(options);
//create a payment object whiuch shows a pending payment inth database
await Payment.create({old:x.id,amount:amount,to_username:to_username,name:paymentform.name,message:paymentform.message})
}