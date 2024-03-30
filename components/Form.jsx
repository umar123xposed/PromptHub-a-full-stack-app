import Link from "next/link"

const Form = ({type, Post, setPost, Submit, handleSubmit}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className="head_text">
        <span className="blue_gradient">{type} Prompt</span>
      </h1>

      <p className="desc text-left max-w-md">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quibusdam veniam odit dolores ipsam quos distinctio ut soluta maxime ea.
      </p>
      <form action=""
      onSubmit={handleSubmit}
      className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">

        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base tex">Your AI Prompt</span>
        </label>
        <textarea value={Post.prompt} onChange={(e)=>{setPost({...Post, prompt: e.target.value})}}
        className="form_textarea" placeholder="Your prompt here..." required></textarea>

<label htmlFor="">
          <span className="font-satoshi font-semibold text-base tex">Tags:</span>
        </label>
        <input value={Post.tag} onChange={(e)=>{setPost({...Post, tag: e.target.value})}}
        className="form_input" placeholder="#web, #software, #AI" required></input>

<div className="flex-end mx-3 mb-5 gap-4">
      <Link href="/" className="text-gray-500 text-sm">Cancel</Link>

      <button className="px-4 py-1.5 text-sm bg-primary-orange text-white rounded-full" type="submit" disable={`${Submit}`}>
        {Submit ? `${type}...`: type}
      </button>
      </div>
      </form>

      
      
    </section>
  )
}

export default Form
