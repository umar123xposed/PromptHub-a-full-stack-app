'use client';
import Form from '@components/Form'
import { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

const Edit = () => {

  const Router= useRouter()
  const searchParams= useSearchParams()
  const promptId= searchParams.get('id')

    const [Submit, setSubmit]=useState(false)
    const [Post, setPost]=useState({
        prompt:'',
        tag:''
    })

    useEffect(()=>{
      const getPromptDetail=async()=>{
        const response= await fetch(`/api/prompt/${promptId}`)
        const data= await response.json()
        setPost({
          prompt: data.prompt,
          tag: data.tag
        })
      }

      if(promptId){
        getPromptDetail()
      }
      
    },[promptId])

    const updatePrompt=async(e)=>{
      e.preventDefault();
      setSubmit(true)
      
      if(!promptId){
        alert('Prompt Id not found!')
      }

      try{
        const response= await fetch(`/api/prompt/${promptId}`,{
          method:'PATCH',
          body: JSON.stringify({
            prompt: Post.prompt,
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
    <Form type='Edit' Post={Post} setPost={setPost} Submit={Submit} handleSubmit={updatePrompt}/>
  )
}

export default Edit
