import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from "../../appwrite/config" 
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { addCoins } from '../../store/authSlice'


const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function PostForm({ post }) {
    const [isAiLoading, setIsAiLoading] = useState(false);
    
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || post?.slug || '', 
            content: post?.content || '',
            status: post?.status || 'active',
        },
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData) 


    const handleAiEnhance = async (e) => {
    e.preventDefault();

    const topic = getValues("title");
    const content = getValues("content");

    if (!topic) {
        alert("Please enter a title first!");
        return;
    }

    setIsAiLoading(true);
    try {
        const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        });

        const prompt = `
You are an expert educator.

TOPIC: ${topic}

EXISTING CONTENT:
${content || "No content provided."}

TASK:
1. Provide a structured, high-quality educational explanation.
2. Add missing details or examples.
3. Use Markdown (headings, bullet points, examples).
        `;

        const result = await model.generateContent(prompt);
        setValue("content", result.response.text(), {
    shouldDirty: true,
    shouldTouch: true,
    shouldValidate: true,
});


    } catch (error) {
        console.error("Gemini Error:", error);
        alert("AI enhancement failed. Check API key or quota.");
    } finally {
        setIsAiLoading(false);
    }
};


    const submit = async (data) => {
        if (!userData) {
            alert("You must be logged in to post!");
            return;
        }

        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
            console.log("Uploaded File ID:", file.$id);
            if (file) appwriteService.deleteFile(post.featuredimage)

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredimage: file ? file.$id : post.featuredimage,
            })
            if (dbPost) {
                dispatch(addCoins(10)); 
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);
            if (file) {
                const dbPost = await appwriteService.createPost({
                    ...data,
                    featuredimage: file.$id,
                    userID: userData.$id,
                })
                if (dbPost) navigate(`/post/${dbPost.$id}`)
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') 
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-').replace(/\s/g, '-')
        return ''
    }, [])

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true })
            }
        })
        return () => subscription.unsubscribe()
    }, [watch, slugTransform, setValue])

    if (!userData) {
        return <div className="w-full text-center py-8"><h1 className="text-2xl font-bold">Please Login.</h1></div>
    }
    
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input label="Title :" placeholder="Title" className="mb-4" {...register("title", { required: true })} />
                <Input label="Slug :" placeholder="Slug" className="mb-4" {...register("slug", { required: true })} 
                    onInput={(e) => { setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true }); }} />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input label="Featured Image :" type="file" className="mb-4" accept="image/*" {...register("image", { required: !post })} />
                {post && (
                    <div className="w-full mb-4">
                        <img src={appwriteService.getFileView(post.featuredimage)} alt={post.title} className="rounded-lg" />
                    </div>
                )}
                <Select options={["active", "inactive"]} label="Status" className="mb-4" {...register("status", { required: true })} />
                
                <Button type="submit" bgColor={post ? "bg-green-500" : "bg-blue-500"} className="w-full mb-2">
                    {post ? "Update Post" : "Publish Post"}
                </Button>
                
                {!post && (
                    <Button 
                        type="button" 
                        onClick={handleAiEnhance}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        disabled={isAiLoading}
                    >
                        {isAiLoading ? "AI is thinking..." : "✨ AI-Enhanced"}
                    </Button>
                )}
            </div>
        </form>
    );
}

export default PostForm;



