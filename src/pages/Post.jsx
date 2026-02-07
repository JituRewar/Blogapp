// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import appwriteService from "../appwrite/config";
// import { Button, Container } from "../components";
// import parse from "html-react-parser";
// import { useSelector } from "react-redux";

// export default function Post() {
//     const [post, setPost] = useState(null);
//     const { slug } = useParams();
//     const navigate = useNavigate();

//     const userData = useSelector((state) => state.auth.userData);

//     const isAuthor = post && userData ? post.userID === userData.$id : false;

//     useEffect(() => {
//         if (slug) {
//             appwriteService.getPost(slug).then((post) => {
//                 if (post) setPost(post);
//                 else navigate("/");
//             });
//         } else navigate("/");
//     }, [slug, navigate]);

//     const deletePost = () => {
//         appwriteService.deletePost(post.$id).then((status) => {
//             if (status) {
//                 appwriteService.deleteFile(post.featuredimage);
//                 navigate("/");
//             }
//         });
//     };

//     return post ? (
//         <div className="py-8">
//             <Container>
//                 <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
//                     <img
//                         src={appwriteService.getFileView(post.featuredimage)}
//                         alt={post.title}
//                         className="rounded-xl"
//                     />

//                     {isAuthor && (
//                         <div className="absolute right-6 top-6">
//                             <Link to={`/edit-post/${post.$id}`}>
//                                 <Button bgColor="bg-green-500" className="mr-3">
//                                     Edit
//                                 </Button>
//                             </Link>
//                             <Button bgColor="bg-red-500" onClick={deletePost}>
//                                 Delete
//                             </Button>
//                         </div>
//                     )}
//                 </div>
//                 <div className="w-full mb-6">
//                     <h1 className="text-2xl font-bold">{post.title}</h1>
//                 </div>
//                 <div className="browser-css">
//                     {parse(post.content)}
//                 </div>
//             </Container>
//         </div>
//     ) : null;
// }

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userID === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredimage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-10 bg-slate-50 min-h-screen">
            <Container>
                <div className="max-w-5xl mx-auto space-y-8">

                    {/* Image Card */}
                    <div className="relative rounded-2xl border bg-white shadow-sm overflow-hidden">
                        <img
                            src={appwriteService.getFileView(post.featuredimage)}
                            alt={post.title}
                            className="w-full max-h-105 object-cover"
                        />

                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex gap-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button
                                        bgColor="bg-blue-600"
                                        className="px-4 py-1.5 rounded-lg text-sm"
                                    >
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    bgColor="bg-red-500"
                                    className="px-4 py-1.5 rounded-lg text-sm"
                                    onClick={deletePost}
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <div className="bg-white rounded-2xl border shadow-sm px-8 py-6">
                        <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">
                            {post.title}
                        </h1>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-2xl border shadow-sm px-8 py-6">
                        <div className="browser-css prose prose-slate max-w-none">
                            {parse(post.content)}
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    ) : null;
}