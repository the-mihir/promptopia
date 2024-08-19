"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from '@/components/Form';

const Page = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch('/api/prompt/new', {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user?.id,  // Fixed typo here
                    tag: post.tag
                }),
            });
            if (response.ok) {
                router.push('/');  // Fixed typo here
            }
        } catch (e) {
            console.log(e);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form  // Fixed typo here
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    );
};

export default Page;
