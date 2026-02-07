import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import { Github, Linkedin, Instagram, Twitter } from 'lucide-react'


function Footer() {
  return (
    <section className="relative overflow-hidden py-12 bg-gray-200 border-t-2 border-black">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap -m-6">
          {/* Brand/Logo Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-4 inline-flex items-center">
                  <Logo width="120px" />
                </div>
                <p className="text-gray-600 max-w-xs mb-6">
                  A modern platform to share your thoughts with the world. Create, read, and inspire.
                </p>
                <div className="flex space-x-4">
                  <a href="https://github.com" target="_blank" className="text-gray-600 hover:text-black transition-transform hover:scale-110">
                    <Github size={20} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" className="text-gray-600 hover:text-blue-700 transition-transform hover:scale-110">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://instagram.com" target="_blank" className="text-gray-600 hover:text-pink-600 transition-transform hover:scale-110">
                    <Instagram size={20} />
                  </a>
                  <a href="https://twitter.com" target="_blank" className="text-gray-600 hover:text-blue-400 transition-transform hover:scale-110">
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">Company</h3>
            <ul>
              {['Features', 'Pricing', 'Affiliate'].map((item) => (
                <li key={item} className="mb-3">
                  <Link className="text-base font-medium text-gray-900 hover:text-gray-600" to="/">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">Support</h3>
            <ul>
              {['Help', 'Contact', 'FAQ'].map((item) => (
                <li key={item} className="mb-3">
                  <Link className="text-base font-medium text-gray-900 hover:text-gray-600" to="/">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">Legals</h3>
            <ul>
              {['Terms', 'Privacy', 'Licensing'].map((item) => (
                <li key={item} className="mb-3">
                  <Link className="text-base font-medium text-gray-900 hover:text-gray-600" to="/">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

       
        <div className="mt-12 border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Copywrite disclaimer 
          </p>
         <div className="mt-4 md:mt-0 text-xs text-gray-600">
            Made with ❤️ for Developers
          </div>
        </div>
      </div>
    </section>
  )
}





export default Footer