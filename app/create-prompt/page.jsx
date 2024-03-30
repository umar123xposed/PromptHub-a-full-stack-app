'use client';
import Form from '@components/Form'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const page = () => {

  const Router= useRouter()
  const {data: session}= useSession()
    const [Submit, setSubmit]=useState(false)
    const [Post, setPost]=useState({
        prompt:'',
        tag:''
    })

    const createPrompt=async(e)=>{
      e.preventDefault();
      setSubmit(true)

      try{
        const response= await fetch('/api/prompt/new',{
          method:'POST',
          body: JSON.stringify({
            prompt: Post.prompt,
            userId: session?.user.id,
            tag:Post.tag,
          }) 

        })
        if(response.ok){
          Router.push('/')
        }

      }
      catch(error){
        console.log(error)
      }
      finally{
        setSubmit(false)
      }

    }

  return (
    <Form type='Create' Post={Post} setPost={setPost} Submit={Submit} handleSubmit={createPrompt}/>
  )
}

export default page