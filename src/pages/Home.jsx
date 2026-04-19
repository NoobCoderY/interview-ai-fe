import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthModel from '../components/AuthModel';
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import Footer from '../components/Footer';


function Home() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate()
  return (
    <div className='min-h-screen bg-[#0b0d17] flex flex-col'>
      <Navbar />

      <div className='flex-1 px-4 sm:px-6 py-12 md:py-20'>
        <div className='max-w-6xl mx-auto'>

          <div className='flex justify-center mb-6'>
            <div className='bg-violet-900/30 text-violet-300 text-sm px-4 py-2 rounded-full flex items-center gap-2 border border-violet-700/40'>
              <HiSparkles size={16} className="text-violet-400" />
              AI Powered Smart Interview Platform
            </div>


          </div>
          <div className='text-center mb-28'>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-3xl sm:text-4xl md:text-6xl font-semibold leading-tight max-w-4xl mx-auto text-white'>
              Land Your Dream Job with
              <span className='relative inline-block'>
                <span className='bg-violet-600/20 text-violet-400 px-5 py-1 rounded-full border border-violet-500/30'>
                  AI-Powered Practice
                </span>
              </span>



            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className='text-slate-400 mt-6 max-w-2xl mx-auto text-lg'>
              Stop winging interviews. Practice with an AI that asks real questions,
              adapts to your answers, and gives you the honest feedback recruiters never will.

            </motion.p>

            <div className='flex flex-col sm:flex-row flex-wrap justify-center gap-4 mt-10'>
              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/interview")
                }}
                whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ opacity: 1, scale: 0.98 }}
                className='bg-violet-600 text-white px-8 sm:px-10 py-3 w-full sm:w-auto rounded-full hover:bg-violet-700 transition shadow-lg shadow-violet-900/40'>
                Start Practicing Free

              </motion.button>

              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/history")
                }}
                whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ opacity: 1, scale: 0.98 }}
                className='border border-[#2d3148] text-slate-300 px-8 sm:px-10 py-3 w-full sm:w-auto rounded-full hover:bg-[#1e2235] transition'>
                My Interview History

              </motion.button>
            </div>
          </div>

          <div className='flex flex-col md:flex-row justify-center items-center gap-10 mb-20 md:mb-28 mt-16'>
            {
              [
                {
                  icon: <BsRobot size={24} />,
                  step: "STEP 1",
                  title: "Pick Your Role & Level",
                  desc: "Select your target job role and experience level. The AI calibrates question difficulty instantly."
                },
                {
                  icon: <BsMic size={24} />,
                  step: "STEP 2",
                  title: "Answer with Your Voice",
                  desc: "Speak your answers naturally. The AI listens, follows up, and keeps you on your toes."
                },
                {
                  icon: <BsClock size={24} />,
                  step: "STEP 3",
                  title: "Get Your Score & Insights",
                  desc: "Receive a detailed breakdown of strengths, gaps, and exactly what to improve next."
                }
              ].map((item, index) => (
                <motion.div key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 + index * 0.2 }}
                  whileHover={{ rotate: 0, scale: 1.06 }}

                  className={`
        relative bg-[#151928] rounded-3xl border-2 border-[#2d3148] 
        hover:border-violet-500 p-8 md:p-10 w-full sm:w-80 max-w-[90%] shadow-md hover:shadow-2xl hover:shadow-violet-900/20
        transition-all duration-300
        ${index === 0 ? "md:rotate-[-4deg]" : ""}
        ${index === 1 ? "md:rotate-[3deg] md:-mt-6 shadow-xl" : ""}
        ${index === 2 ? "md:rotate-[-3deg]" : ""}
      `}>

                  <div className='absolute -top-8 left-1/2 -translate-x-1/2 bg-[#151928] border-2 border-violet-500 text-violet-400 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg'>
                    {item.icon}</div>
                  <div className='pt-10 text-center'>
                    <div className='text-xs text-violet-400 font-semibold mb-2 tracking-wider'>{item.step}</div>
                    <h3 className='font-semibold mb-3 text-lg text-white'>{item.title}</h3>
                    <p className='text-sm text-slate-400 leading-relaxed'>{item.desc}</p>
                  </div>


                </motion.div>
              ))
            }
          </div>


          <div className='mb-32'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-10 md:mb-16 text-white'>
              Built to Make You{" "}
              <span className="text-violet-400">Interview-Ready</span>

            </motion.h2>

            <div className='grid md:grid-cols-2 gap-10'>
              {
                [
                  {
                    image: evalImg,
                    icon: <BsBarChart size={20} />,
                    title: "Brutally Honest AI Scoring",
                    desc: "Every answer is scored on communication, technical depth, and confidence — the same way a real interviewer thinks."
                  },
                  {
                    image: resumeImg,
                    icon: <BsFileEarmarkText size={20} />,
                    title: "Resume-Aware Questions",
                    desc: "Upload your resume and get questions tailored to your actual projects, skills, and experience."
                  },
                  {
                    image: pdfImg,
                    icon: <BsFileEarmarkText size={20} />,
                    title: "Downloadable PDF Report",
                    desc: "Walk away with a full report — what you nailed, what needs work, and a clear improvement roadmap."
                  },
                  {
                    image: analyticsImg,
                    icon: <BsBarChart size={20} />,
                    title: "Progress Tracking Over Time",
                    desc: "See how your scores improve across sessions. Spot patterns in your weak areas and fix them fast."
                  }
                ].map((item, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className='bg-[#151928] border border-[#2d3148] rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-violet-500/40 transition-all'>
                    <div className='flex flex-col sm:flex-row items-center gap-6 md:gap-8'>
                      <div className='w-full sm:w-1/2 flex justify-center'>
                        <img src={item.image} alt={item.title} className='w-full h-auto object-contain max-h-48 md:max-h-64' />
                      </div>

                      <div className='w-full sm:w-1/2'>
                        <div className='bg-violet-600/20 text-violet-400 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-violet-500/30'>
                          {item.icon}
                        </div>
                        <h3 className='font-semibold mb-3 text-xl text-white'>{item.title}</h3>
                        <p className='text-slate-400 text-sm leading-relaxed'>{item.desc}</p>
                      </div>

                    </div>


                  </motion.div>
                ))
              }
            </div>


          </div>

          <div className='mb-32'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-10 md:mb-16 text-white'>
              Every Interview Type,{" "}
              <span className="text-violet-400">Covered</span>

            </motion.h2>

            <div className='grid md:grid-cols-2 gap-10'>
              {
                [
                  {
                    img: hrImg,
                    title: "HR & Behavioral Mode",
                    desc: "Master situational questions, cultural fit, and leadership narratives that HR teams love."
                  },
                  {
                    img: techImg,
                    title: "Technical Deep-Dive Mode",
                    desc: "Role-specific technical questions — from system design to coding concepts, tailored to your stack."
                  },

                  {
                    img: confidenceImg,
                    title: "Confidence & Tone Analysis",
                    desc: "Get feedback on how you sound, not just what you say. Build presence that stands out."
                  },
                  {
                    img: creditImg,
                    title: "Flexible Credits System",
                    desc: "Start free, scale as you grow. Buy credits anytime and keep practicing without limits."
                  }
                ].map((mode, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="bg-[#151928] border border-[#2d3148] rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-violet-500/40 transition-all">

                    <div className='flex items-center justify-between gap-4 md:gap-6'>
                      <div className="w-1/2">
                        <h3 className="font-semibold text-lg md:text-xl mb-2 md:mb-3 text-white">
                          {mode.title}
                        </h3>

                        <p className="text-slate-400 text-sm leading-relaxed">
                          {mode.desc}
                        </p>
                      </div>

                      {/* RIGHT IMAGE */}
                      <div className="w-1/2 flex justify-end">
                        <img
                          src={mode.img}
                          alt={mode.title}
                          className="w-20 h-20 md:w-28 md:h-28 object-contain"
                        />
                      </div>



                    </div>


                  </motion.div>
                ))
              }
            </div>


          </div>

        </div>
      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

        <Footer/>

    </div>
  )
}

export default Home
