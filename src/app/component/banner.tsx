"use client"

import React from 'react'
import Link from 'next/link';

const Banner = () => {
  return (
    <div className='w-[100%] h-[100vh] overflow-hidden'>
              <Link href="/Promotion">
                <img className='w-[100%] object-top object-cover' src="https://im.uniqlo.com/global-cms/spa/res5994e004652b0308c5966b1fa0eba671fr.jpg"/>
                <div className='absolute inset-0 flex items-center justify-center'>


                </div>
              </Link>
    </div>
  )
}

export default Banner
