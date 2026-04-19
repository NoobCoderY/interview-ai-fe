import React from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function Auth({isModel = false}) {
    const dispatch = useDispatch()

    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth,provider)
            let User = response.user
            let name = User.displayName
            let email = User.email
            const result = await axios.post(ServerUrl + "/api/auth/google" , {name , email} , {withCredentials:true})
            dispatch(setUserData(result.data))
            


            
        } catch (error) {
            console.log(error)
              dispatch(setUserData(null))
        }
    }
  return (
    <div className={`
      w-full 
      ${isModel ? "py-4" : "min-h-screen bg-[#0b0d17] flex items-center justify-center px-6 py-20"}
    `}>
        <motion.div 
        initial={{opacity:0 , y:-40}} 
        animate={{opacity:1 , y:0}} 
        transition={{duration:1.05}}
        className={`
        w-full 
        ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"}
        bg-[#151928] shadow-2xl border border-[#2d3148]
      `}>
            <div className='flex items-center justify-center gap-3 mb-6'>
                <div className='bg-violet-600 text-white p-2 rounded-lg'>
                    <BsRobot size={18}/>
                </div>
                <h2 className='font-semibold text-lg text-white'>InterviewIQ.AI</h2>
            </div>

            <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4 text-white'>
                Your next offer starts
                <span className='bg-violet-600/20 text-violet-400 px-3 py-1 rounded-full inline-flex items-center gap-2 border border-violet-500/30 ml-2'>
                    <IoSparkles size={16}/>
                    with one practice
                </span>
            </h1>

            <p className='text-slate-400 text-center text-sm md:text-base leading-relaxed mb-8'>
                Sign in to access AI-powered mock interviews tailored to your role,
                get honest performance scores, and walk into every interview with confidence.
            </p>

            <motion.button 
            onClick={handleGoogleAuth}
            whileHover={{opacity:0.9 , scale:1.03}}
            whileTap={{opacity:1 , scale:0.98}}
            className='w-full flex items-center justify-center gap-3 py-3 bg-violet-600 text-white rounded-full shadow-lg shadow-violet-900/40 hover:bg-violet-700 transition'>
                <FcGoogle size={20}/>
                Continue with Google
            </motion.button>
        </motion.div>
    </div>
  )
}

export default Auth
