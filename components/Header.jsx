'use client'

import { SignInButton,  UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Authenticated, Unauthenticated } from 'convex/react'
import { BarLoader } from 'react-spinners'

const Header = () => {
  return (
   <>
   <nav className='fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-20 border-b'>
    <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
      {/* Logo */}
      <Link href={"/"} className='flex items-center'>
      <Image src="/spott.png" alt='Spott logo' width={500} height={500} className='w-full h-11' priority/>
      </Link>

      {/* Search & Location - Desktop Only */}

      {/* Right Side Actions  */}
      <div>
        <Authenticated>
                <UserButton />
              </Authenticated>
          <Unauthenticated>
               <SignInButton mode='modal'>
                <Button size='sm'>Sign In</Button>
                 
               </SignInButton>
              </Unauthenticated>
              {/* Show the user button when the user is signed in */}
              
      </div>

    </div>

    {/* Mobile Search & Location - Below Header */}

    {/* Loading */}
    <div className='absolute bottom-0 left-0 w-full'>
      <BarLoader width={"100%"} color='#a855f7'/>
    </div>

   </nav>

   {/* Modals */}

   </>
  )
}

export default Header