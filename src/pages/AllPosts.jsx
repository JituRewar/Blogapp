
import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-white py-12">
      <Container>
      
        <div className="mb-12 space-y-4 animate-in fade-in slide-in-from-top-6 duration-700">
          <div className="inline-block px-4 py-1.5 mb-2 rounded-full bg-purple-50 border border-purple-100">
            <span className="text-sm font-bold text-purple-600 uppercase tracking-widest">
              Knowledge Base
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Explore <span className="text-[#3498db]">Resources</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Dive into our community-curated library of notes, summaries, and 
            interactive learning paths.
          </p>
        </div>

    
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-64 rounded-3xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {posts.map((post, index) => (
              <div 
                key={post.$id} 
                className="group relative animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                style={{ animationDelay: `${index * 150}ms` }}
              >
              
                <div className="absolute -inset-1 bg-linear-to-r from-purple-400 to-[#3498db] rounded- blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                
              
                <div className="relative bg-white border-2 border-purple-100/60 rounded-[1.8rem] overflow-hidden transition-all duration-300 group-hover:border-purple-200 group-hover:shadow-xl group-hover:shadow-purple-100/50">
                  <div className="p-1"> 
                     <PostCard
                        $id={post.$id}
                        title={post.title}
                        featuredimage={post.featuredimage}
                      />
                  </div>
                  
                
                  <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-xs font-medium text-slate-400">5 min read</span>
                    <div className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#3498db] group-hover:bg-[#3498db] group-hover:text-white transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

    
        {!loading && posts.length === 0 && (
          <div className="text-center py-20 rounded-[3rem] border-4 border-dashed border-slate-100">
            <p className="text-slate-400 text-xl font-medium">No posts found yet. Be the first to publish!</p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
