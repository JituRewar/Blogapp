import React from "react";
import { Container, LogoutBtn } from "../index";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const coins = useSelector((state) => state.auth.coins);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Notes", slug: "/add-post", active: authStatus },
    { name: "AI Chat", slug: "/aichat", active: authStatus },
    { name: "Dashboard", slug: "/dashboard", active: authStatus },
    { name: "PDF Extract", slug: "/pdf", active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm transition-all duration-300">
      <Container>
        <nav className="flex items-center justify-between py-2.5">
          
         
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative overflow-hidden rounded-full border-2 border-[#3498db]/30 p-0.5 transition-all duration-500 group-hover:border-[#3498db] group-hover:rotate-360">
              <img 
                src="/path-to-your-quantum-logo.jpg" 
                alt="Quantum Explorer-8" 
                className="h-11 w-11 rounded-full object-cover"
              />
              <div className="absolute inset-0 rounded-full bg-linear-to-tr from-[#3498db]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="hidden md:block text-xl font-black tracking-tighter text-slate-800">
              <span className="text-[#3498db]">QEconsePta</span>
            </span>
          </Link>

       
          <ul className="flex items-center gap-1">
          
            {authStatus && (
              <li className="flex items-center bg-blue-50/50 px-4 py-1.5 rounded-2xl border border-blue-100 mr-3 shadow-inner group animate-in fade-in zoom-in duration-500">
                <span className="text-lg mr-2 group-hover:rotate-12 transition-transform">🪙</span>
                <span className="font-bold text-[#3498db] text-sm tracking-tight">{coins}</span>
              </li>
            )}

            
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className={`px-4 py-2 text-sm font-bold transition-all duration-300 rounded-xl relative group
                        ${location.pathname === item.slug 
                          ? "text-[#3498db] bg-blue-50" 
                          : "text-slate-500 hover:text-[#3498db] hover:bg-blue-50/50"}
                      `}
                    >
                      {item.name}
                      
                      {location.pathname === item.slug && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#3498db] rounded-full" />
                      )}
                    </button>
                  </li>
                )
              )}
            </div>

           
            {authStatus && (
              <li className="ml-4 border-l border-slate-200 pl-4 flex items-center gap-3">
                <LogoutBtn className="bg-slate-100 hover:bg-red-50 hover:text-red-500 text-slate-600 transition-colors rounded-xl px-4 py-2 font-bold text-sm" />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;