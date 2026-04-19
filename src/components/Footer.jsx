import React from 'react'
import { BsRobot } from 'react-icons/bs'

function Footer() {
  return (
    <div className='bg-[#0b0d17] flex justify-center px-4 pb-10 py-4 pt-10'>
      <div className='w-full max-w-6xl bg-[#151928] rounded-[24px] shadow-sm border border-[#2d3148] py-8 px-3 text-center'>
        <div className='flex justify-center items-center gap-3 mb-3'>
            <div className='bg-violet-600 text-white p-2 rounded-lg'><BsRobot size={16}/></div>
            <h2 className='font-semibold text-white'>InterviewIQ.AI</h2>
        </div>
        <p className='text-slate-400 text-sm max-w-xl mx-auto'>
          The sharpest candidates don't just prepare — they practice smarter.
          InterviewIQ.AI gives you an AI interviewer that challenges you, scores you honestly,
          and helps you get hired.
        </p>
      </div>
    </div>
  )
}

export default Footer
