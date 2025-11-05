// "use client"

// import React, {useState} from 'react';
// import Link from 'next/link';
// import ToggleButton from "../toggleButton";

// const HeaderComponent = () => {



//     const getCookie = (name: string): string | null => {
//   if (typeof document === 'undefined') return null;
//   return document.cookie
//     .split('; ')
//     .find(row => row.startsWith(`${name}=`))
//     ?.split('=')[1] || null;
// };

// const userdataCookie = getCookie('user-data');



// const usernameCookie = userdataCookie ? JSON.parse(userdataCookie).name : null;

//   return (
//         <div className='flex justify-between items-center h-[10vh] sticky top-0 bg-white z-50 relative'>
//           <div className='hidden md:flex md:justify-evenly md:items-center w-[40%]'>
//             <Link href='/'><span className='hover:underline'>Home</span></Link>
//             <Link href='/products/'><span className='hover:underline'>Products</span></Link>
//             <Link href='/FAQ/'><span className='hover:underline'>FAQ</span></Link>
//             <Link href='/Promotion/'><span className='hover:underline'>Promotion</span></Link>
//           </div>

//           {/* <ToggleButton />   */}
//           <div className='w-[10%]'>
//             <Link href='/'>
//                 <img className='w-[100px] hover:scale-110' src='https://i.ibb.co/zh3Wx2Lj/revoshop-logo-cropped.png'></img>
//             </Link>
            
//           </div>
//           <div className='w-[40%] flex justify-evenly items-center w-[40%]'>
//             <Link href='/login/'> Login</Link>
//             <Link href='/user/'> <span><i className="fa-solid fa-user"></i></span></Link>
//             <Link href='/user'>{usernameCookie ? <span className='hidden md:inline'>Hello, {usernameCookie}</span> : <span className='hidden md:inline'>Hello, Guest</span>}</Link>
//             <Link href='/AddToCart/'><i className="fa-solid fa-cart-shopping"></i></Link>
//           </div>

//         </div>
//   )
// }

// export default HeaderComponent




// "use client"

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useAuth } from '@/app/context/AuthContext';

// const HeaderComponent = () => {
//   const [username, setUsername] = useState<string | null>(null);
//   const { user, isAuthenticated } = useAuth();

//   // Update username whenever user changes
//   useEffect(() => {
//     if (isAuthenticated && user) {
//       setUsername(user.name);
//       console.log('✅ Header updated with user:', user.name);
//     } else {
//       setUsername(null);
//       console.log('👤 Header showing guest');
//     }
//   }, [isAuthenticated, user]);

//   return (
//     <div className='flex justify-between items-center h-[10vh] sticky top-0 bg-white z-50 relative'>
//       <div className='hidden md:flex md:justify-evenly md:items-center w-[40%]'>
//         <Link href='/'>
//           <span className='hover:underline'>Home</span>
//         </Link>
//         <Link href='/products/'>
//           <span className='hover:underline'>Products</span>
//         </Link>
//         <Link href='/FAQ/'>
//           <span className='hover:underline'>FAQ</span>
//         </Link>
//         <Link href='/Promotion/'>
//           <span className='hover:underline'>Promotion</span>
//         </Link>
//       </div>

//       <div className='w-[10%]'>
//         <Link href='/'>
//           <img 
//             className='w-[100px] hover:scale-110' 
//             src='https://i.ibb.co/zh3Wx2Lj/revoshop-logo-cropped.png'
//             alt="Revoshop Logo"
//           />
//         </Link>
//       </div>

//       <div className='w-[40%] flex justify-evenly items-center'>
//         {!isAuthenticated && (
//           <Link href='/login/'>Login</Link>
//         )}
        
//         <Link href='/user/'>
//           <span>
//             <i className="fa-solid fa-user"></i>
//           </span>
//         </Link>
        
//         <Link href='/user'>
//           {username ? (
//             <span className='hidden md:inline'>Hello, {username}</span>
//           ) : (
//             <span className='hidden md:inline'>Hello, Guest</span>
//           )}
//         </Link>
        
//         <Link href='/AddToCart/'>
//           <i className="fa-solid fa-cart-shopping"></i>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default HeaderComponent;













"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import CartIcon from "@/app/component/cartIcon";
import ThemeToggle from "@/app/component/themeToggle";
import "../../globals.css";

const HeaderComponent = () => {
  const [username, setUsername] = useState<string | null>(null);
  const { user, isAuthenticated, logout } = useAuth();

  // Update username whenever user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      setUsername(user.name);
      console.log('✅ Header updated with user:', user.name);
    } else {
      setUsername(null);
      console.log('👤 Header showing guest');
    }
  }, [isAuthenticated, user]);

  const handleLogout = () => {
    logout();
  };

  // console.log(user);

  return (
    <div className='flex justify-between items-center h-[10vh] sticky top-0 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 z-50 relative' id='headerId'>
      <div className='hidden md:flex md:justify-evenly md:items-center w-[40%]'>
        <Link href='/'>
          <span className='hover:underline'>Home</span>
        </Link>
        <Link href='/products/'>
          <span className='hover:underline'>Products</span>
        </Link>
        <Link href='/FAQ/'>
          <span className='hover:underline'>FAQ</span>
        </Link>
        <Link href='/Promotion/'>
          <span className='hover:underline'>Promotion</span>
        </Link>
      </div>

      <div className='w-[10%]'>
        <Link href='/'>
          <img 
            className='w-[100px] hover:scale-110' 
            src='https://i.ibb.co/zh3Wx2Lj/revoshop-logo-cropped.png'
            alt="Revoshop Logo"
          />
        </Link>
      </div>

      

      <div className='w-[40%] flex justify-evenly items-center'>
        <ThemeToggle></ThemeToggle>

        <Link href='/AddToCart/'>
          <CartIcon className="ml-2" />
        </Link>
        
        <Link href='/user'>
          {username ? (
            <span className='hidden md:inline'>Hello, {username}</span>
          ) : (
            <span className='hidden md:inline'>Hello, Guest</span>
          )}
        </Link>
        {!isAuthenticated ? (
          <Link href='/login/'>Login</Link>
        ) : (
          <div>

                  <button onClick={handleLogout} className='hover:underline'>
            Logout
          </button>
          </div>

        )}
        

        

      </div>
    </div>
  );
}

export default HeaderComponent;