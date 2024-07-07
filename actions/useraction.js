"use server"


import connectDB from "@/app/db/db"
import Payment from "@/app/models/payment"
import User from "@/app/models/user"
import Razorpay from "razorpay"


export const initiate =async (amount,to_user,paymentform)=>{
    await connectDB()
    var instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_RKEY_ID, key_secret: process.env.RKEY_SECRET })

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
await Payment.create({oid:x.id,amount:amount,to_user:to_user,name:paymentform.name,message:paymentform.message})
return x
}


export const fetchUser=async(username)=>{
    await connectDB();
    let u =await User.findOne({username:username});
    let user = u.toObject({flattenObjectIds:true})
    return user
}

export const fetchpayments =async (username)=>{
    await connectDB();
    //find allpayment sortedd by descresing order of amount
    let p = await Payment.find({to_user:username}).sort({amount:-1});
        return p


}
export const udateUser=async(data,oldusername)=>{
    await connectDB();
    let ndata=Object.fromEntries(data)

    if(oldusername!==ndata.username){;
    let u1 =await User.findOne({username:oldusername});
if(u){
    return {error:"Username already exists"}
}

}
await User.updateOne({email:ndata.email},ndata)
}