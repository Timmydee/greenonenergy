'use client'

import React, { useState, useEffect } from 'react';
import { Globe2, Sun, Users2, Handshake } from "lucide-react";

const stats = [
  {
    icon: <Users2 className="w-8 h-8" />,
    title: "50+ Homes Guided",
    description: "We've helped over 50 households estimate and plan their solar energy journey.",
    color: "from-emerald-400 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50",
  },
  {
    icon: <Sun className="w-8 h-8" />,
    title: "300+ kg CO₂ Saved",
    description: "By switching to solar, users collectively reduced their environmental footprint.",
    color: "from-yellow-400 to-orange-500",
    bgGradient: "from-yellow-50 to-orange-50",
  },
  {
    icon: <Handshake className="w-8 h-8" />,
    title: "10+ Trusted Vendors",
    description: "We're building a network of verified vendors for better service & pricing.",
    color: "from-blue-400 to-purple-500",
    bgGradient: "from-blue-50 to-purple-50",
  },
  {
    icon: <Globe2 className="w-8 h-8" />,
    title: "Aligned with SDG 7",
    description: "Our mission contributes to clean, affordable energy for Nigerians.",
    color: "from-green-400 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50",
  },
];

export default function ImpactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--greenon-tint) 0%, var(--background) 50%, var(--greenon-light) 100%)' }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ backgroundColor: 'var(--greenon)' }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ backgroundColor: 'var(--greenon-light)', animationDelay: '1s' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-15 animate-pulse"
          style={{ backgroundColor: 'var(--greenon)', animationDelay: '2s' }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-30 animate-bounce"
            style={{
              backgroundColor: 'var(--greenon)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div 
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg"
              style={{ 
                backgroundColor: 'var(--greenon-light)',
                color: 'var(--greenon-dark)'
              }}
            >
              <Sun className="w-4 h-4 mr-2 animate-spin" style={{ animationDuration: '3s' }} />
              Making a Difference
            </div>
            <h2 className="h2 mb-6 leading-tight" style={{ fontSize: '4rem', fontWeight: '700' }}>
              <span style={{ 
                background: `linear-gradient(135deg, var(--text-main) 0%, var(--greenon-dark) 50%, var(--greenon) 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Impact & Mission
              </span>
            </h2>
            <p className="p3 max-w-2xl mx-auto leading-relaxed" style={{ fontSize: '1.25rem' }}>
              We're building a clean energy future — one household at a time, 
              <span style={{ color: 'var(--greenon)', fontWeight: '600' }}> transforming communities</span> across Nigeria.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative transform transition-all duration-700 hover:scale-105 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card */}
              <div className={`relative h-full p-8 rounded-2xl transition-all duration-500 cursor-pointer overflow-hidden
                ${hoveredIndex === index 
                  ? 'shadow-2xl bg-white border-2' 
                  : 'shadow-lg bg-white/80 backdrop-blur-sm border'
                }`}
                style={{ 
                  borderColor: hoveredIndex === index ? 'var(--greenon)' : 'var(--gray-border)',
                  boxShadow: hoveredIndex === index ? `0 25px 50px -12px rgba(15, 157, 88, 0.25)` : undefined
                }}
              >
                
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div 
                    className="absolute inset-0 animate-pulse"
                    style={{ 
                      background: `radial-gradient(circle at 1px 1px, var(--greenon) 1px, transparent 0)`,
                      backgroundSize: '20px 20px'
                    }}
                  />
                </div>

                {/* Icon Container */}
                <div className={`relative mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                  
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="h4 mb-3 transition-colors duration-300" style={{ 
                    color: hoveredIndex === index ? 'var(--greenon-dark)' : 'var(--text-main)',
                    fontSize: '1.5rem',
                    fontWeight: '700'
                  }}>
                    {stat.title}
                  </h3>
                  <p className="p2 leading-relaxed transition-colors duration-300" style={{ 
                    color: hoveredIndex === index ? 'var(--text-main)' : 'var(--text-secondary)'
                  }}>
                    {stat.description}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div 
                  className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500"
                  style={{ borderColor: hoveredIndex === index ? 'var(--greenon-light)' : 'transparent' }}
                />
                
                {/* Shine Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:translate-x-full transition-all duration-1000 transform -translate-x-full" />
              </div>

              {/* Floating Number Badge */}
              <div className={`absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg transform transition-all duration-500 ${
                hoveredIndex === index ? 'scale-110 rotate-12' : 'scale-100'
              }`}>
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-20 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div 
            className="inline-flex items-center px-8 py-4 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            style={{ 
              backgroundColor: 'var(--greenon)',
              fontFamily: 'var(--font-inter)'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--greenon-dark)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--greenon)'}
          >
            <span>Join Our Clean Energy Mission</span>
            <div className="ml-3 w-2 h-2 bg-white rounded-full animate-ping" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
          .h2 {
            font-size: 2.5rem !important;
          }
          .p3 {
            font-size: 1.1rem !important;
          }
        }
        
        @media (max-width: 450px) {
          .h2 {
            font-size: 2rem !important;
          }
          .p3 {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}