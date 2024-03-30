import Feed from "@components/Feed"

const Home = () => {
  return (
<>

   <section className="w-full flex-center flex-col">
    <h1 className="text-center head_text">Discover Prompts
    <br className="max-md:hidden"/>
    <span className="orange_gradient">AI-Powered prompts</span>
    </h1>
    <p className="desc text-center"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque praesentium excepturi assumenda vitae quidem commodi pariatur earum, molestiae tenetur perspiciatis.</p>

    <Feed/>
    
   </section>
   </>
  )
}

export default Home
