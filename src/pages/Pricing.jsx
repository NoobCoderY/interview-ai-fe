import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react";
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import toast from 'react-hot-toast';
function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Try it out. No commitment, no card needed. Just start practicing.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 150,
      description: "For candidates actively job hunting who need consistent practice.",
      features: [
        "150 AI Interview Credits",
        "Detailed Answer Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      credits: 650,
      description: "For serious candidates targeting top companies. Maximum reps, maximum readiness.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
    },
  ];



  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id)

      const amount =  
      plan.id === "basic" ? 100 :
      plan.id === "pro" ? 500 : 0;

      const result = await axios.post(ServerUrl + "/api/payment/order" , {
        planId: plan.id,
        amount: amount,
        credits: plan.credits,
      },{withCredentials:true})
      

      const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: result.data.amount,
      currency: "INR",
      name: "InterviewIQ.AI",
      description: `${plan.name} - ${plan.credits} Credits`,
      order_id: result.data.id,

      handler:async function (response) {
        const verifypay = await axios.post(ServerUrl + "/api/payment/verify" ,response , {withCredentials:true})
        dispatch(setUserData(verifypay.data.user))
          toast.success('Payment successful! Credits added to your account.')
          navigate("/")

      },
      theme:{
        color: "#10b981",
      },

      }

      const rzp = new window.Razorpay(options)
      rzp.open()

      setLoadingPlan(null);
    } catch (error) {
     console.log(error)
     setLoadingPlan(null);
     const msg = error?.response?.data?.message || 'Payment failed. Please try again.'
     toast.error(msg)
    }
  }



  return (
    <div className='min-h-screen bg-[#0b0d17] py-10 md:py-16 px-4 sm:px-6'>

      <div className='max-w-6xl mx-auto mb-10 md:mb-14 flex items-start gap-3 md:gap-4'>

        <button onClick={() => navigate("/")} className='mt-2 p-3 rounded-full bg-[#151928] border border-[#2d3148] shadow hover:border-violet-500 transition'>
          <FaArrowLeft className='text-slate-400' />
        </button>

        <div className="text-center w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Invest in Your Career
          </h1>
          <p className="text-slate-400 mt-3 text-lg">
            Start free. Upgrade when you're ready to go deeper.
          </p>
        </div>
      </div>


      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto'>

        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id

          return (
            <motion.div key={plan.id}
              whileHover={!plan.default && { scale: 1.03 }}
              onClick={() => !plan.default && setSelectedPlan(plan.id)}

              className={`relative rounded-3xl p-8 transition-all duration-300 border 
                ${isSelected
                  ? "border-violet-500 shadow-2xl shadow-violet-900/30 bg-[#1a1d2e]"
                  : "border-[#2d3148] bg-[#151928] shadow-md"
                }
                ${plan.default ? "cursor-default" : "cursor-pointer"}
              `}
            >

              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-6 right-6 bg-violet-600 text-white text-xs px-4 py-1 rounded-full shadow">
                  {plan.badge}
                </div>
              )}

              {/* Default Tag */}
              {plan.default && (
                <div className="absolute top-6 right-6 bg-[#2d3148] text-slate-400 text-xs px-3 py-1 rounded-full">
                  Default
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-semibold text-white">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-4">
                <span className="text-3xl font-bold text-violet-400">
                  {plan.price}
                </span>
                <p className="text-slate-400 mt-1">
                  {plan.credits} Credits
                </p>
              </div>

              {/* Description */}
              <p className="text-slate-400 mt-4 text-sm leading-relaxed">
                {plan.description}
              </p>

              {/* Features */}
              <div className="mt-6 space-y-3 text-left">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="text-violet-500 text-sm" />
                    <span className="text-slate-300 text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {!plan.default &&
                <button
                disabled={loadingPlan === plan.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isSelected) {
                      setSelectedPlan(plan.id)
                    } else {
                      handlePayment(plan)
                    }
                  }} className={`w-full mt-8 py-3 rounded-xl font-semibold transition ${isSelected
                    ? "bg-violet-600 text-white hover:bg-violet-700"
                    : "bg-[#1e2235] text-slate-300 hover:bg-[#2d3148] border border-[#2d3148]"
                    }`}>
                  {loadingPlan === plan.id
                    ? "Processing..."
                    : isSelected
                      ? "Proceed to Pay"
                      : "Select Plan"}

                </button>
              }
            </motion.div>
          )
        })}
      </div>

    </div>
  )
}

export default Pricing
