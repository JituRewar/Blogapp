import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const coins = useSelector((state) => state.auth.coins); 

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Notes",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "AI Chat",
      slug: "/aichat",
      active: authStatus,
    },
    { name: "Dashboard", 
      slug: "/dashboard", 
      active: authStatus },
    {
  name: "PDF Extract",
  slug: "/pdf",
  active: authStatus,
},

  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <Container>
        <nav className="flex items-center justify-between py-3">
        
          <Link to="/" className="flex items-center gap-2">
            <Logo width="60px" />
            
          </Link>

          
          <ul className="flex items-center gap-2">
            {authStatus && (
              <li className="flex items-center bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200 mr-2 shadow-sm">
                <span className="text-lg mr-1.5">🪙</span>
                <span className="font-bold text-orange-600 text-sm">{coins}</span>
              </li>
            )}
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-orange-400 transition scale-1.12"
                    >

                      {item.name}
                    </button>
                  </li>
                )
            )}

            
            {authStatus && (
              <li className="ml-2">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
