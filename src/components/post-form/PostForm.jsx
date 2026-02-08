import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from "../../appwrite/config" 
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux' 
import { GoogleGenerativeAI } from "@google/generative-ai";
import { addCoins } from '../../store/authSlice'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function PostForm({ post }) {
    const [isAiLoading, setIsAiLoading] = useState(false);
    const dispatch = useDispatch();
    
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
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 

            const prompt = `You are an expert educator. TOPIC: ${topic}. EXISTING CONTENT: ${content || "No content provided."} TASK: Provide a structured, high-quality educational explanation using Markdown.`;

            const result = await model.generateContent(prompt);
            setValue("content", result.response.text(), {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
            });

        } catch (error) {
            console.error("Gemini Error:", error);
            alert("AI enhancement failed.");
        } finally {
            setIsAiLoading(false);
        }
    };

    const submit = async (data) => {
        if (!userData) return alert("Please login.");

        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
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
                if (dbPost) {
                    dispatch(addCoins(10));
                    navigate(`/post/${dbPost.$id}`);
                }
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
        return <div className="w-full text-center py-20 bg-slate-50 min-h-screen">
            <h1 className="text-3xl font-bold text-slate-400">Please Login to Access Editor.</h1>
        </div>
    }
    
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap lg:flex-nowrap gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-full lg:w-2/3 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#3498db] mb-4">Content Creator</h2>
                    <Input 
                        label="Article Title" 
                        placeholder="Enter a catchy title..." 
                        className="mb-6 bg-slate-50 border-none text-lg font-semibold focus:ring-2 focus:ring-[#3498db]/20" 
                        {...register("title", { required: true })} 
                    />
                    
                    <div className="relative group">
                        <RTE label="Deep Knowledge Editor" name="content" control={control} defaultValue={getValues("content")} />
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/3 space-y-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 sticky top-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Settings & Tools</h2>
                    
                    <Input 
                        label="URL Slug" 
                        placeholder="slug-url" 
                        className="mb-4 bg-white" 
                        {...register("slug", { required: true })} 
                        onInput={(e) => { setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true }); }} 
                    />

                    <div className="mb-6">
                        <Input 
                            label="Featured Image" 
                            type="file" 
                            className="mb-2 file:bg-[#3498db] file:text-white file:border-none file:rounded-md file:px-3 file:py-1 cursor-pointer" 
                            accept="image/*" 
                            {...register("image", { required: !post })} 
                        />
                        {post && (
                            <div className="mt-2 relative group overflow-hidden rounded-xl border-2 border-slate-200">
                                <img src={appwriteService.getFileView(post.featuredimage)} alt={post.title} className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                            </div>
                        )}
                    </div>

                    <Select 
                        options={["active", "inactive"]} 
                        label="Visibility Status" 
                        className="mb-8" 
                        {...register("status", { required: true })} 
                    />

                    <div className="space-y-3">
                        <Button 
                            type="submit" 
                            className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95 ${post ? "bg-emerald-500 shadow-emerald-100 hover:bg-emerald-600" : "bg-[#3498db] shadow-blue-100 hover:bg-[#2980b9]"}`}
                        >
                            {post ? "Update Knowledge Post" : "Publish to Library"}
                        </Button>

                        {!post && (
                            <button 
                                type="button" 
                                onClick={handleAiEnhance}
                                disabled={isAiLoading}
                                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white transition-all duration-300 group
                                    ${isAiLoading ? "bg-slate-400 cursor-not-allowed" : "bg-linear-to-r from-violet-600 to-[#3498db] hover:shadow-xl hover:shadow-indigo-200 hover:-translate-y-1"}
                                `}
                            >
                                <span className={isAiLoading ? "animate-spin" : "group-hover:rotate-12 transition-transform"}>
                                    {isAiLoading ? "🌀" : "✨"}
                                </span>
                                {isAiLoading ? "AI is refining..." : "AI Enhance"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}

export default PostForm;


