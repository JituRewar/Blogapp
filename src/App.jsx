// import React, { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import './App.css'
// import authService from "./appwrite/auth"
// import {login, logout} from "./store/authSlice"
// import { Footer, Header } from './components'
// import { Outlet, useNavigate } from 'react-router-dom'
// import { Container,Button } from './components/index'


// function App() {
//   const [loading, setLoading] = useState(true)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   useEffect(() => {
//     authService.getCurrentUser()
//     .then((userData) => {
//       if (userData) {
//         dispatch(login({userData}))
//       } else {
//         dispatch(logout())
//       }
//     })
//     .finally(() => setLoading(false))
//   }, [])
  
//   return !loading ? (
//     <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
//       <div className='w-full block'>
//         <Header />
//         <main>
         
//          <Outlet />

//         </main>
//         <Footer />
//       </div>
//     </div>
//   ) : null
// }

// export default App


import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { Container, Button } from './components/index'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  const features = [
    {
      title: "Smart Personalized Notes",
      desc: "Our intelligent system adapts to your learning style, turning raw notes and PDFs into interconnected knowledge graphs.",
      icon: "🧠"
    },
    {
      title: "PDF Mastery",
      desc: "Upload any PDF for automatic highlights, summaries, and searchable annotations with just-in-time remediation.",
      icon: "📄"
    },
    {
      title: "Interconnected Knowledge",
      desc: "Visualize relationships with dynamic graphs. Wikilinks and backlinks reveal hidden connections in your data.",
      icon: "🕸️"
    },
    {
      title: "Adaptive Learning Paths",
      desc: "AI-driven quizzes, feedback, and spaced repetition tailored to your pace and evolving knowledge base.",
      icon: "🚀"
    }
  ];

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-blue-100">
      <Header />

      <main className="grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white py-20 lg:py-32">
          {/* Subtle Background Decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
             <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#3498db] blur-[120px]"></div>
          </div>

          <Container>
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-slate-900">
                Revise <span className="text-[#3498db]">Smarter.</span><br />
                Learn <span className="relative inline-block">
                  Faster.
                  <div className="absolute bottom-2 left-0 w-full h-3 bg-[#3498db]/10 -z-10"></div>
                </span>
              </h1>

              <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed">
                Efficient revision transforms scattered information into
                structured knowledge. Reduce cognitive load and improve
                long-term retention with intent-driven learning.
              </p>

              <div className="flex justify-center gap-4 pt-4">
                <Button
                  className="px-10 py-4 rounded-xl font-medium border-2 border-[#3498db] text-[#3498db] bg-white hover:bg-[#3498db] hover:text-white transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-blue-100"
                >
                  Explore Library
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Features Grid Section */}
        <section className="py-24 bg-slate-50/50">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((f, i) => (
                <div 
                  key={i}
                  className="group p-8 rounded-3xl bg-white border border-slate-100 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(52,152,219,0.15)] hover:-translate-y-2"
                >
                  <div className="w-12 h-12 mb-6 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-slate-800 group-hover:text-[#3498db] transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Dynamic Content (Outlet) */}
        <section className="py-16">
          <Container>
            <div className="rounded-3xl border border-dashed border-slate-200 p-8 min-h-50 bg-white">
              <Outlet />
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  ) : (
    <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-[#3498db]/20 border-t-[#3498db] rounded-full animate-spin"></div>
    </div>
  )
}

export default App