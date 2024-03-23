"use client";
import Link from 'next/link'
import Image from 'next/image'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'
import { useEffect, useState } from 'react';

const Nav = () => {

     const { data: session} =useSession();

     const [Provider, setProvider]= useState(null)
     const [Toggle, setToggle]= useState(false)

     useEffect(()=>{
        const setUpProvider= async ()=>{
            const response= await getProviders()
            setProvider(response)

        }
        setUpProvider()
     },[])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href='/' className='flex gap-2 flex-center'>
        <Image src="/assets/images/logo.svg" width={30} height={30} className='object-contain'></Image>
        <p className='logo_text'>logo</p>
        </Link>

    {/* desktop navigation */}
    <div className="sm:flex hidden">
        { session?.user ? (
        <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>
                Create post
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'> Sign out</button>

            <Link href="/profile" >
                <Image src="/assets/images/profile.svg" height={37} width={37} className='rounded-full'></Image>
            </Link>

        </div>
         ) :
        (
            <>
        {Provider && Object.values(Provider).map((Provider)=>{
            (
                <button type='button' key={Provider.name} className='outline_btn' onClick={()=>signIn(Provider.id)}>Sign In</button>
            )
        }) }
        </>
        )
        }
    </div>

    {/* mobile navigation */}
    <div className='sm:hidden flex relative'>
    { session?.user ? (
        <div className='flex'>
            
                <Image src="/assets/images/profile.svg" height={37} width={37} className='rounded-full' onClick={()=>{setToggle(!Toggle)}}></Image>

                {Toggle? (
                    <div className="dropdown">
                        <Link href="/profile" className='dropdown_link' onClick={()=>{setToggle(false)}}>Profile</Link>
                        <Link href="/create-prompt" className='dropdown_link' onClick={()=>{setToggle(false)}}>Create prompt</Link>
                        <button type="button"onClick={()=>{setToggle(false);
                        signOut();}} className='mt-5 w-full black_btn'>Sign out</button>

                    </div>
                )
            :(
                <div/>
            )}
            

        </div>
         ) :
        (
            <>
        {Provider && Object.values(Provider).map((Provider)=>{
            (
                <button type='button' key={Provider.name} className='outline_btn' onClick={()=>signIn(Provider.id)}>Sign In</button>
            )
        }) }
        </>
        )
        }

    </div>
    </nav>
  )
}


export default Nav
