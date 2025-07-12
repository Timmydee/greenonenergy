'use client'

import {
    Zap,
    Mail,
    MessageCircle,
    Users,
  } from "lucide-react";
  import { useState } from "react";
  
  const steps = [
    {
      title: "Estimate Your Energy Needs",
      icon: <Zap className="w-8 h-8" />,
      description:
        "Use our calculator to select your appliances and get a tailored estimate of your energy consumption.",
      gradient: "from-yellow-400 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      shadow: "shadow-yellow-500/20",
    },
    {
      title: "Get Your Summary via Email",
      icon: <Mail className="w-8 h-8" />,
      description:
        "Receive a clear, beginner-friendly breakdown of your recommended inverter, solar panel size, and runtime.",
      gradient: "from-blue-400 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-50",
      shadow: "shadow-blue-500/20",
    },
    {
      title: "Reach Us on WhatsApp",
      icon: <MessageCircle className="w-8 h-8" />,
      description:
        "Click the link in your email to message our team directly and request vendor referrals or guidance.",
      gradient: "from-[var(--greenon)] to-[var(--greenon-dark)]",
      bgGradient: "from-[var(--greenon-light)] to-[var(--greenon-tint)]",
      shadow: "shadow-[var(--greenon)]/20",
    },
    {
      title: "Get Matched with Verified Vendors",
      icon: <Users className="w-8 h-8" />,
      description:
        "We'll connect you to trusted solar vendors near you that suit your energy needs and budget.",
      gradient: "from-purple-400 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      shadow: "shadow-purple-500/20",
    },
  ];
  
  export default function HowItWorks() {
    const [hoveredStep, setHoveredStep] = useState(null);
  
    return (
      <section 
        id="how-it-works" 
        className="bg-background relative overflow-hidden"
        style={{ padding: 'var(--section-padding) 0' }}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse" 
               style={{ background: 'linear-gradient(135deg, var(--greenon-light), var(--greenon-tint))' }}></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000"
               style={{ background: 'linear-gradient(135deg, var(--greenon-tint), var(--greenon-light))' }}></div>
        </div>
  
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg"
              style={{ background: 'linear-gradient(135deg, var(--greenon), var(--greenon-dark))' }}
            >
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="h2 mb-6">How GreenOn Works</h2>
            <p className="p3 max-w-3xl mx-auto">
              From calculating your power needs to connecting you with trusted solar vendors — everything happens in 
              <span className="font-semibold" style={{ color: 'var(--greenon)' }}> minutes</span>.
            </p>
          </div>
  
          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* Connecting line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-8 h-0.5 z-0"
                       style={{ background: 'linear-gradient(90deg, var(--gray-border), transparent)' }}>
                    <div 
                      className="absolute inset-0 transform origin-left transition-transform duration-700 scale-x-0 group-hover:scale-x-100"
                      style={{ background: 'linear-gradient(90deg, var(--greenon), var(--greenon-dark))' }}
                    ></div>
                  </div>
                )}
  
                {/* Card */}
                <div 
                  className={`relative bg-white/90 backdrop-blur-sm rounded-3xl border transition-all duration-500 hover:shadow-2xl ${step.shadow} hover:scale-105 hover:-translate-y-2`}
                  style={{ 
                    padding: 'var(--card-padding)',
                    borderColor: 'var(--gray-border)',
                    borderWidth: '1px'
                  }}
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-3xl`}></div>
                  
                  {/* Step number */}
                  <div 
                    className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg z-10 transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
                    style={{ 
                      background: index === 2 
                        ? 'linear-gradient(135deg, var(--greenon), var(--greenon-dark))'
                        : step.gradient.includes('yellow') 
                          ? 'linear-gradient(135deg, #facc15, #f97316)'
                          : step.gradient.includes('blue')
                            ? 'linear-gradient(135deg, #60a5fa, #6366f1)'
                            : 'linear-gradient(135deg, #a855f7, #ec4899)'
                    }}
                  >
                    <span className="text-lg">{index + 1}</span>
                  </div>
  
                  {/* Icon */}
                  <div 
                    className="mb-6 p-4 rounded-2xl inline-flex text-white shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 relative z-10"
                    style={{ 
                      background: index === 2 
                        ? 'linear-gradient(135deg, var(--greenon), var(--greenon-dark))'
                        : step.gradient.includes('yellow') 
                          ? 'linear-gradient(135deg, #facc15, #f97316)'
                          : step.gradient.includes('blue')
                            ? 'linear-gradient(135deg, #60a5fa, #6366f1)'
                            : 'linear-gradient(135deg, #a855f7, #ec4899)'
                    }}
                  >
                    {step.icon}
                  </div>
  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="h4 mb-3 group-hover:opacity-90 transition-opacity">
                      {step.title}
                    </h3>
                    <p className="p2 group-hover:opacity-90 transition-opacity">
                      {step.description}
                    </p>
                  </div>
  
                  {/* Hover glow effect */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: 'linear-gradient(135deg, var(--greenon-light), var(--greenon-tint))' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
  
          {/* Call-to-action */}
          <div className="text-center">
            <div 
              className="inline-flex items-center gap-4 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
              style={{ border: '1px solid var(--gray-border)' }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--greenon), var(--greenon-dark))' }}
              >
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="h4 mb-1">Ready to get started?</p>
                <p className="p2">Calculate your energy needs in under 3 minutes</p>
              </div>
              <button 
                className="text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ 
                  background: 'linear-gradient(135deg, var(--greenon), var(--greenon-dark))',
                  fontFamily: 'var(--font-inter)'
                }}
              >
                Start Calculator
              </button>
            </div>
          </div>
        </div>
  
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-pulse opacity-40"
              style={{
                background: 'linear-gradient(135deg, var(--greenon), var(--greenon-dark))',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </section>
    );
  }