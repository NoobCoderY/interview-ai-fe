import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft } from 'react-icons/fa'
import toast from 'react-hot-toast'
function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })

                setInterviews(result.data)

            } catch (error) {
                console.log(error)
                const msg = error?.response?.data?.message || 'Failed to load interview history.'
                toast.error(msg)
            }

        }

        getMyInterviews()

    }, [])


    return (
        <div className='min-h-screen bg-[#0b0d17] py-8 md:py-10 px-4' >
            <div className='w-full max-w-4xl mx-auto'>

                <div className='mb-10 w-full flex items-start gap-4 flex-wrap'>
                    <button
                        onClick={() => navigate("/")}
                        className='mt-1 p-3 rounded-full bg-[#151928] border border-[#2d3148] shadow hover:border-violet-500 transition'><FaArrowLeft className='text-slate-400' /></button>

                    <div>
                        <h1 className='text-2xl md:text-3xl font-bold text-white'>
                            Your Interview History
                        </h1>
                        <p className='text-slate-400 mt-2'>
                            Every session you've completed — review your scores and see how far you've come.
                        </p>

                    </div>
                </div>


                {interviews.length === 0 ?
                    <div className='bg-[#151928] p-10 rounded-2xl border border-[#2d3148] text-center'>
                        <p className='text-slate-400'>
                            No interviews yet. Hit "Start Practicing Free" on the home page and complete your first session.
                        </p>

                    </div>

                    :

                    <div className='grid gap-6'>
                        {interviews.map((item, index) => (
                            <div key={index}
                            onClick={()=>navigate(`/report/${item._id}`)}
                             className='bg-[#151928] p-4 md:p-6 rounded-2xl hover:shadow-xl hover:shadow-violet-900/10 transition-all duration-300 cursor-pointer border border-[#2d3148] hover:border-violet-500/40'>
                                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">
                                            {item.role}
                                        </h3>

                                        <p className="text-slate-400 text-sm mt-1">
                                            {item.experience} • {item.mode}
                                        </p>

                                        <p className="text-xs text-slate-500 mt-2">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className='flex items-center gap-6'>

                                        {/* SCORE */}
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-violet-400">
                                                {item.finalScore || 0}/10
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                Overall Score
                                            </p>
                                        </div>

                                        {/* STATUS BADGE */}
                                        <span
                                            className={`px-4 py-1 rounded-full text-xs font-medium ${item.status === "completed"
                                                    ? "bg-violet-600/20 text-violet-400 border border-violet-500/30"
                                                    : "bg-yellow-900/30 text-yellow-400 border border-yellow-600/30"
                                                }`}
                                        >
                                            {item.status}
                                        </span>


                                    </div>
                                </div>

                            </div>

                        ))
                        }

                    </div>
                }
            </div>

        </div>
    )
}

export default InterviewHistory
