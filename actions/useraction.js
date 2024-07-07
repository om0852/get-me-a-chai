"use server";

import connectDB from "@/app/db/db";
import Payment from "@/app/models/payment";
import User from "@/app/models/user";
import Razorpay from "razorpay";

export const initiate = async (amount, to_user, paymentform, email) => {
  await connectDB();
  let u = await User.findOne({ email: email });

  var instance = new Razorpay({
    key_id: u.r_id,
    key_secret: u.r_secret,
  });

  instance.orders.create({
    amount: 50000,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  });
  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };
  let x = await instance.orders.create(options);
  //create a payment object whiuch shows a pending payment inth database
  await Payment.create({
    oid: x.id,
    amount: Number.parseInt(amount) / 100,
    to_user: to_user,
    name: paymentform.name,
    message: paymentform.message,
  });
  return x;
};

export const fetchUserByName = async (username) => {
  await connectDB();
  let u = await User.findOne({ username: username });
  if (u) {
    return true;
  } else {
    return false;
  }
};
export const fetchUser = async (email) => {
  await connectDB();
  let u = await User.findOne({ email: email });
  let user;
  if (u) {
    user = u.toObject({ flattenObjectIds: true });
  }
  return user;
};

export const fetchpayments = async (username) => {
  await connectDB();
  //find allpayment sortedd by descresing order of amount
  let p = await Payment.find({ to_user: username }).sort({ amount: -1 });
  return p;
};
export const updateUser = async (ndata, email) => {
  await connectDB();
  let olduser = await User.findOne({ email: email });
  let u1 = await User.findOne({ username: ndata.username });
  if (u1 && u1.email == ndata.email) {
    return { error: "Username already exists" };
  }
  const dd = await User.updateOne(
    { email: ndata.email },
    {
      name: ndata.name,
      username: ndata.username,
      cover_picture: ndata.cover_picture,
      profile_picture: ndata.profile_picture,
      r_id: ndata.r_id,
      r_secret: ndata.r_secret,
    },
    { new: true }
  );
  await Payment.updateMany(
    { to_user: olduser.username },
    { to_user: ndata.username }
  );
  console.log(dd);
};
