import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from "next-auth/providers/github";
import User from '@/app/models/user'
import mongoose from 'mongoose'
import connectDB from "@/app/db/db"

export const authoptions= NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    // // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === 'github') {
        try {
          
          await connectDB();
          let currentUser = await User.findOne({ email: user.email });
          if (!currentUser) {
            const newUser = new User({
              email: user.email,
              username:user.email.split('@')[0],
              profile_picture:user.image
            });
            await newUser.save();
            user.name = newUser.username;
          } else {
            user.name = currentUser.username;
          }
          return true;
        } catch (error) {
          console.error('Error connecting to database:', error);
          return false;
        }
      }
      return true;
    }
  },
  async session({session,user,token}){
    const dbUser=await User.findOne({email:session.user.email})
    session.user.name=dbUser.username
    session.user.username=dbUser.username
    console.log(session)
    return session;
  }
})
export{ authoptions as GET,authoptions as POST} 