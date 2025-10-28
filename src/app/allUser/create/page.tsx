"use client";

import React from 'react';  
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {

    const [email, setEmail] = useState("john@mail.com");
  const [password, setPassword] = useState("changeme");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

    let initialValue = {
    name:"arthur",
    email:"arthur@gmail.com",
    password:"arthur",
    avatar:"https://commons.wikimedia.org/wiki/Main_Page#/media/File:Wiewi%C3%B3rka_w_Parku_Bednarskiego_w_Krakowie,_20241117_0903_2741.jpg"
  }

  const [userData, setuserData] = useState(initialValue)



//     const setCookie = (name: string, value: string, minutes: number = 30) => {
//     const expires = new Date();
//     expires.setTime(expires.getTime() + (minutes * 60 * 1000));
//     document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}`;
//     console.log(`🍪 Cookie set: ${name}`);
//   };


//   const getCookie = (name: string): string | null => {
//     return document.cookie
//       .split('; ')
//       .find(row => row.startsWith(`${name}=`))
//       ?.split('=')[1] || null;
//   };

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setuserData((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log('🔑 Attempting Signup...');
      
      const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            userData
            // {
        //     name,
        //   email,
        //   password,
        //   avatar:"https://commons.wikimedia.org/wiki/Main_Page#/media/File:Wiewi%C3%B3rka_w_Parku_Bednarskiego_w_Krakowie,_20241117_0903_2741.jpg"
        
            // }
        )
        })
        if (!response.ok) {
        throw new Error('Invalid credentials');
        }

        
      const data = await response.json();
      console.log('✅ Signup successful');
      alert('✅ Signup successful');
      }

      catch (err) {
        console.error(err)
      }
    }
    




      // Set cookies
    //   setCookie('auth-token', data.access_token, 30);
    //   setCookie('refresh-token', data.refresh_token, 30);
    //   setCookie('email', email, 30);
    //   setCookie('user-role', getUserRole(email), 30);

      // Get user profile
    //   const userResponse = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
    //     headers: {
    //       'Authorization': `Bearer ${data.access_token}`,
    //     },
    //   });
    


  return (
    <div className='m-3 p-3'>

        Create New User
        Please Fill Up The Form
        <form onSubmit={handleSignup} className='flex flex-col items-center'>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name' value={userData.name} onChange={handleChange} className=' border-b-2 border-black'></input>
            <label htmlFor='Email'>Email</label>
            <input type='email' id='email' name='email' value={userData.email} onChange={handleChange} className=' border-b-2 border-black'></input>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' value={userData.password} onChange={handleChange} className=' border-b-2 border-black'></input>
            <label htmlFor='avatar'>Avatar</label>
            <input type='test' id='avatar' name='avatar' value={userData.avatar} onChange={handleChange} className=' border-b-2 border-black'></input>
            <button type='submit' onSubmit={handleSignup}>SignUp</button>
            <button type='reset' onClick={() => window.location.href = '/'}>Cancel</button>
        </form>
      
    </div>
  )
}
  
//   }
export default Page
