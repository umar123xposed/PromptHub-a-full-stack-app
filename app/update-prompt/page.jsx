"use client";
import { useEffect, useState,Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import Loading from "@components/Loading"

const UpdatePrompt = () => {
  const router = useRouter();


  const [submitting, setSubmitting] = useState(false);

  const searchParams =  useSearchParams();

  const promptId = searchParams.get("id");

  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`)
        const data =  await response.json();

        setPost(
            {
                prompt : data.prompt,
                tag: data.tag,
            }
        )
    }
    if(promptId){
        getPromptDetails();
    }
  },[promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!promptId){
        return alert("Prompt ID  not found!");
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
      <Form
        type="Edit"
        Post={post}
        setPost={setPost}
        Submit={submitting}
        handleSubmit={updatePrompt}
      ></Form>
  );
};

const EditPrompt = () => {
    return <Suspense fallback={<Loading />}>
        <UpdatePrompt />
    </Suspense>
}

export default EditPrompt;