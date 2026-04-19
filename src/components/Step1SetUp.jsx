import React from 'react'
import { motion } from "motion/react"
import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
} from "react-icons/fa";
import { useState } from 'react';
import axios from "axios"
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import toast from 'react-hot-toast';
function Step1SetUp({ onStart }) {
    const {userData}= useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumeText, setResumeText] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);


    const handleUploadResume = async () => {
        if (!resumeFile || analyzing) return;
        setAnalyzing(true)

        const formdata = new FormData()
        formdata.append("resume", resumeFile)

        try {
            const result = await axios.post(ServerUrl + "/api/interview/resume", formdata, { withCredentials: true })

            console.log(result.data)

            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);
            toast.success('Resume analyzed successfully!');
            setAnalyzing(false);

        } catch (error) {
            console.log(error)
            setAnalyzing(false);
            const msg = error?.response?.data?.message || 'Failed to analyze resume. Please try again.'
            toast.error(msg)
        }
    }

    const handleStart = async () => {
        setLoading(true)
        try {
           const result = await axios.post(ServerUrl + "/api/interview/generate-questions" , {role, experience, mode , resumeText, projects, skills } , {withCredentials:true}) 
           console.log(result.data)
           if(userData){
            dispatch(setUserData({...userData , credits:result.data.creditsLeft}))
           }
           setLoading(false)
           toast.success('Interview started! Good luck.')
           onStart(result.data)

        } catch (error) {
            console.log(error)
            setLoading(false)
            const msg = error?.response?.data?.message || 'Failed to start interview. Please try again.'
            toast.error(msg)
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='min-h-screen flex items-center justify-center bg-[#0b0d17] px-4 py-8 md:py-4'>

<div className='w-full max-w-6xl bg-[#151928] rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-[#2d3148]'>

                <motion.div
                    initial={{ x: -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className='relative bg-gradient-to-br from-violet-900/40 to-indigo-900/30 p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#2d3148]'>

                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
                        You're One Step Away from Interview-Ready
                    </h2>

                    <p className="text-slate-400 mb-10">
                        Fill in your role and experience on the right. Upload your resume
                        for questions built around your actual background.
                    </p>

                    <div className='space-y-5'>

                        {
                            [
                                {
                                    icon: <FaUserTie className="text-violet-400 text-xl" />,
                                    text: "Target Role & Experience Level",
                                },
                                {
                                    icon: <FaMicrophoneAlt className="text-violet-400 text-xl" />,
                                    text: "Voice-Driven AI Interview",
                                },
                                {
                                    icon: <FaChartLine className="text-violet-400 text-xl" />,
                                    text: "Instant Score & Improvement Tips",
                                },
                            ].map((item, index) => (
                                <motion.div key={index}
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 + index * 0.15 }}
                                    whileHover={{ scale: 1.03 }}
                                    className='flex items-center space-x-4 bg-[#1e2235] p-4 rounded-xl border border-[#2d3148] cursor-pointer hover:border-violet-500/50 transition'>
                                    {item.icon}
                                    <span className='text-slate-300 font-medium'>{item.text}</span>

                                </motion.div>
                            ))
                        }
                    </div>



                </motion.div>



                <motion.div
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="p-8 md:p-12 bg-[#151928]">

                    <h2 className='text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8'>
                        Configure Your Interview
                    </h2>


                    <div className='space-y-6'>

                        <div className='relative'>
                            <FaUserTie className='absolute top-4 left-4 text-slate-500' />

                            <input type='text' placeholder='Enter role'
                                className='w-full pl-12 pr-4 py-3 bg-[#1e2235] border border-[#2d3148] text-white placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition'
                                onChange={(e) => setRole(e.target.value)} value={role} />
                        </div>


                        <div className='relative'>
                            <FaBriefcase className='absolute top-4 left-4 text-slate-500' />

                            <input type='text' placeholder='Experience (e.g. 2 years)'
                                className='w-full pl-12 pr-4 py-3 bg-[#1e2235] border border-[#2d3148] text-white placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition'
                                onChange={(e) => setExperience(e.target.value)} value={experience} />



                        </div>

                        <select value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className='w-full py-3 px-4 bg-[#1e2235] border border-[#2d3148] text-white rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition'>

                            <option value="Technical">Technical Interview</option>
                            <option value="HR">HR Interview</option>

                        </select>

                        {!analysisDone && (
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                onClick={() => document.getElementById("resumeUpload").click()}
                                className='border-2 border-dashed border-[#2d3148] rounded-xl p-8 text-center cursor-pointer hover:border-violet-500 hover:bg-violet-900/10 transition'>

                                <FaFileUpload className='text-4xl mx-auto text-violet-400 mb-3' />

                                <input type="file"
                                    accept="application/pdf"
                                    id="resumeUpload"
                                    className='hidden'
                                    onChange={(e) => setResumeFile(e.target.files[0])} />

                                <p className='text-slate-400 font-medium'>
                                    {resumeFile ? resumeFile.name : "Upload your resume for tailored questions (Optional)"}
                                </p>

                                {resumeFile && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUploadResume()
                                        }}

                                        className='mt-4 bg-violet-600 text-white px-5 py-2 rounded-lg hover:bg-violet-700 transition'>
                                        {analyzing ? "Analyzing..." : "Analyze Resume"}



                                    </motion.button>)}

                            </motion.div>


                        )}

                        {analysisDone && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='bg-[#1e2235] border border-[#2d3148] rounded-xl p-5 space-y-4'>
                                <h3 className='text-lg font-semibold text-white'>
                                    Resume Analysis Result</h3>

                                {projects.length > 0 && (
                                    <div>
                                        <p className='font-medium text-slate-300 mb-1'>
                                            Projects:</p>

                                        <ul className='list-disc list-inside text-slate-400 space-y-1'>
                                            {projects.map((p, i) => (
                                                <li key={i}>{p}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {skills.length > 0 && (
                                    <div>
                                        <p className='font-medium text-slate-300 mb-1'>
                                            Skills:</p>

                                        <div className='flex flex-wrap gap-2'>
                                            {skills.map((s, i) => (
                                                <span key={i} className='bg-violet-600/20 text-violet-400 border border-violet-500/30 px-3 py-1 rounded-full text-sm'>{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </motion.div>
                        )}


                        <motion.button
                        onClick={handleStart}
                            disabled={!role || !experience || loading}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            className='w-full disabled:bg-slate-700 disabled:text-slate-500 bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-full text-lg font-semibold transition duration-300 shadow-lg shadow-violet-900/40'>
                            {loading ? "Staring...":"Start Interview"}


                        </motion.button>
                    </div>

                </motion.div>
            </div>

        </motion.div>
    )
}

export default Step1SetUp
