import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import { Github, Linkedin, Instagram, Twitter } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <section className="relative overflow-hidden bg-[#fdf2f7] pt-16 pb-8 border-t border-blue-100">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100/40 rounded-full blur-[80px] z-0"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-100/40 rounded-full blur-[80px] z-0"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap -m-6">
          
          {/* Brand & Socials */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col">
              <div className="mb-6 inline-flex items-center">
                <Logo width="140px" />
              </div>
              <p className="text-slate-600 max-w-xs mb-8 leading-relaxed font-medium">
                Transforming scattered notes into <span className="text-[#3498db]">structured wisdom</span>. 
                Share, learn, and evolve your knowledge base.
              </p>
              
              <div className="flex space-x-5">
                {[
                  { icon: <Github size={20} />, link: "https://github.com", color: "hover:text-slate-900" },
                  { icon: <Linkedin size={20} />, link: "https://linkedin.com", color: "hover:text-[#0077b5]" },
                  { icon: <Instagram size={20} />, link: "https://instagram.com", color: "hover:text-[#e4405f]" },
                  { icon: <Twitter size={20} />, link: "https://twitter.com", color: "hover:text-[#1da1f2]" },
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl bg-white border border-slate-100 text-slate-400 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-blue-200 ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {[
            { 
                title: "Platform", 
                links: ["Features", "Pricing", "AI Assistant"],
                accent: "text-[#3498db]" 
            },
            { 
                title: "Support", 
                links: ["Help Center", "Contact", "FAQ"],
                accent: "text-pink-500"
            },
            { 
                title: "Company", 
                links: ["Privacy", "Terms", "Licensing"],
                accent: "text-indigo-500" 
            }
          ].map((section) => (
            <div key={section.title} className="w-full p-6 md:w-1/2 lg:w-2/12">
              <h3 className={`mb-7 text-xs font-black uppercase tracking-[0.2em] ${section.accent}`}>
                {section.title}
              </h3>
              <ul>
                {section.links.map((item) => (
                  <li key={item} className="mb-4">
                    <Link 
                      className="text-slate-600 font-semibold hover:text-[#3498db] transition-colors duration-200 flex items-center group" 
                      to="/"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-[#3498db] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-slate-200/60 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm font-bold text-slate-400">
            &copy; {currentYear} <span className="text-slate-600">Quantum-Explorer</span>. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0 px-5 py-2 rounded-full bg-white/50 border border-slate-100 text-xs font-bold text-slate-500 shadow-sm">
             Made with <span className="animate-pulse text-pink-500 mx-1">❤️</span> by <b>Quantum-Explorer-4</b>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer